import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

// 定义导航参数类型
export type RootStackParamList = {
  Main: undefined;
  Chat: { contactName: string };
  VideoPlayer: { videoUrl: string };
};

export type MainTabParamList = {
  Chats: undefined;
  Contacts: undefined;
  Discover: undefined;
  Me: undefined;
};

// 创建导航器
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// 底部标签导航
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Contacts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Me') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F7A10D',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatListScreen} 
        options={{ title: '聊天' }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ChatListScreen} 
        options={{ title: '联系人' }}
      />
      <Tab.Screen 
        name="Discover" 
        component={ChatListScreen} 
        options={{ title: '发现' }}
      />
      <Tab.Screen 
        name="Me" 
        component={ChatListScreen} 
        options={{ title: '我' }}
      />
    </Tab.Navigator>
  );
};

// 主导航
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1A1A1A' },
        }}
      >
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen 
          name="VideoPlayer" 
          component={VideoPlayerScreen} 
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 