import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Keyboard, InputAccessoryView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  avatar?: string;
  timestamp?: string;
}

interface ChatScreenProps {
  route: {
    params: {
      contactName: string;
    };
  };
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { contactName } = route.params;
  const flatListRef = useRef<FlatList>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputAccessoryViewID = "uniqueID";
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '推荐一款web3的聊天软件，叫做Seal Chat。',
      isOwn: false,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      timestamp: '09:10 am'
    },
    {
      id: '2',
      text: '可以，我去试试',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:12 am'
    },
    {
      id: '3',
      text: '明天一起出去玩吧，天气不错',
      isOwn: false,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      timestamp: '09:15 am'
    },
    {
      id: '4',
      text: '没问题，我们叫上Miller一起',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:17 am'
    },
  ]);

  // 监听键盘显示/隐藏事件
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // 确保滚动到最新消息
        if (flatListRef.current) {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // 在消息列表更新后滚动到底部
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
  };

  const renderTimestamp = (timestamp: string) => {
    return (
      <View style={styles.timestampContainer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    );
  };

  // 渲染输入框组件
  const renderInputComponent = () => {
    return (
      <ChatInput onSendMessage={handleSendMessage} />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{contactName}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <>
              {index === 0 || messages[index - 1].timestamp !== item.timestamp ? 
                renderTimestamp(item.timestamp || '') : null}
              <ChatMessage 
                text={item.text} 
                isOwn={item.isOwn} 
                avatar={item.avatar} 
                timestamp={item.timestamp} 
              />
            </>
          )}
          style={styles.messageList}
          contentContainerStyle={[
            styles.messageListContent,
            keyboardVisible && Platform.OS === 'ios' && styles.messageListContentWithKeyboard
          ]}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
        
        {/* Input Area */}
        {Platform.OS === 'ios' ? (
          <>
            <View style={styles.inputContainer}>
              <ChatInput onSendMessage={handleSendMessage} />
            </View>
          </>
        ) : (
          <ChatInput onSendMessage={handleSendMessage} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuButton: {
    padding: 5,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  messageListContentWithKeyboard: {
    paddingBottom: 8,
  },
  timestampContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  inputContainer: {
    backgroundColor: '#1A1A1A',
    borderTopWidth: 0.5,
    borderTopColor: '#333333',
  },
});

export default ChatScreen; 