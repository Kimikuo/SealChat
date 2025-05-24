import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Keyboard, InputAccessoryView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  isOwn: boolean;
  avatar?: string;
  timestamp?: string;
  imageOrientation?: 'horizontal' | 'vertical';
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
      text: '这个软件有什么特点？安全吗？',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:11 am'
    },
    {
      id: '3',
      text: '它基于区块链技术，所有消息都经过端到端加密，非常安全。而且支持去中心化身份认证。',
      isOwn: false,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      timestamp: '09:12 am'
    },
    {
      id: '4',
      text: '听起来不错，我去下载看看。',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:13 am'
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:15 am',
      imageOrientation: 'horizontal'
    },
    {
      id: '6',
      text: '我早就下载好了，你看图片，这是我们公司大楼',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:15 am'
    },
    {
      id: '7',
      imageUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=1160&auto=format&fit=crop',
      isOwn: false,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      timestamp: '09:16 am',
      imageOrientation: 'vertical'
    },
    {
      id: '8',
      text: '这是我们的新办公室，刚刚装修好',
      isOwn: false,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      timestamp: '09:16 am'
    },
    {
      id: '9',
      text: '看起来很不错！我们下周一起去参观一下吧',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:17 am'
    },
    {
      id: '10',
      imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: '09:18 am',
      imageOrientation: 'horizontal'
    }
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

  // 模拟发送图片
  const handleSendImage = () => {
    // 随机选择一个图片URL和方向
    const imageOptions = [
      // 横向图片
      { url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop', orientation: 'horizontal' },
      { url: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=2070&auto=format&fit=crop', orientation: 'horizontal' },
      // 竖向图片
      { url: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=1160&auto=format&fit=crop', orientation: 'vertical' },
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop', orientation: 'vertical' },
    ];
    
    const randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
    
    const newMessage: Message = {
      id: Date.now().toString(),
      imageUrl: randomImage.url,
      isOwn: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageOrientation: randomImage.orientation as 'horizontal' | 'vertical'
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
                imageUrl={item.imageUrl}
                isOwn={item.isOwn} 
                avatar={item.avatar} 
                timestamp={item.timestamp}
                imageOrientation={item.imageOrientation}
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
              <View style={styles.inputRow}>
                <ChatInput onSendMessage={handleSendMessage} />
                <TouchableOpacity style={styles.imageButton} onPress={handleSendImage}>
                  <Ionicons name="image" size={24} color="#F7A10D" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.inputRow}>
            <ChatInput onSendMessage={handleSendMessage} />
            <TouchableOpacity style={styles.imageButton} onPress={handleSendImage}>
              <Ionicons name="image" size={24} color="#F7A10D" />
            </TouchableOpacity>
          </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default ChatScreen; 