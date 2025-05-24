/**
 * SealChat App
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' 或 'chat'
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  // 定义颜色
  const COLORS = {
    primary: '#FFC107',     // 黄色作为主色调
    background: '#121212',  // 深色背景
    card: '#1E1E1E',        // 卡片背景
    text: '#FFFFFF',        // 文本颜色
    border: '#2C2C2C',      // 边框颜色
  };

  // 模拟聊天数据
  const CHATS = [
    {
      id: '1',
      name: 'CZ-BNB',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      message: 'What kind of strategy is better?',
      time: '今天14:23',
    },
    {
      id: '2',
      name: 'Vitalik',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      message: 'What kind of strategy is better?',
      time: '今天14:23',
    },
    {
      id: '3',
      name: 'CZ-BNB',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      message: 'What kind of strategy is better?',
      time: '今天14:23',
    },
    {
      id: '4',
      name: 'CZ-BNB',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'What kind of strategy is better?',
      time: '今天14:23',
    },
  ];

  // 处理添加新对话
  const handleAddPress = () => {
    console.log('Add new chat');
  };
  
  // 处理聊天项点击
  const handleChatPress = (chatId: string, chatName: string) => {
    setSelectedChat(chatName);
    setCurrentScreen('chat');
  };
  
  // 处理返回主页
  const handleGoBack = () => {
    setCurrentScreen('home');
    setSelectedChat(null);
  };

  // 渲染聊天项
  const renderChatItem = ({item}: {item: any}) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => handleChatPress(item.id, item.name)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // 渲染底部导航栏
  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabButton}>
        <Text style={styles.tabIcon}>🌄</Text>
        <Text style={styles.tabLabel}>朋友圈</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Text style={styles.tabIcon}>💬</Text>
        <Text style={styles.tabLabel}>消息</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleButton}>
        <Text style={styles.middleButtonText}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Text style={styles.tabIcon}>👥</Text>
        <Text style={styles.tabLabel}>聊天大厅</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Text style={styles.tabIcon}>👤</Text>
        <Text style={styles.tabLabel}>我的</Text>
      </TouchableOpacity>
    </View>
  );

  // 渲染主页
  const renderHomeScreen = () => (
    <View style={[styles.container, {backgroundColor: COLORS.background}]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MESSAGES</Text>
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* 聊天列表 */}
      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        style={styles.chatList}
      />
      
      {/* 底部导航栏 */}
      {renderTabBar()}
    </View>
  );
  
  // 渲染聊天界面
  const renderChatScreen = () => (
    <View style={styles.container}>
      <ChatScreen 
        route={{ params: { contactName: selectedChat || 'Chat' } }}
        navigation={{ goBack: handleGoBack }}
      />
    </View>
  );

  // 根据当前屏幕状态渲染不同界面
  return currentScreen === 'home' ? renderHomeScreen() : renderChatScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    right: 16,
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    color: '#AAA',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#888',
  },
  middleButton: {
    backgroundColor: '#FFC107',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: -15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  middleButtonText: {
    fontSize: 24,
  },
});

export default App;
