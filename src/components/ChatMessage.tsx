import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

interface ChatMessageProps {
  text?: string;
  imageUrl?: string;
  isOwn: boolean;
  avatar?: string;
  timestamp?: string;
  imageOrientation?: 'horizontal' | 'vertical';
}

const { width } = Dimensions.get('window');
const MAX_IMAGE_WIDTH = width * 0.6; // 图片最大宽度为屏幕宽度的60%

const ChatMessage: React.FC<ChatMessageProps> = ({ text, imageUrl, isOwn, avatar, timestamp, imageOrientation = 'horizontal' }) => {
  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      {!isOwn && avatar && (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      )}
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        {text && (
          <Text style={[styles.text, isOwn ? styles.ownText : styles.otherText]}>{text}</Text>
        )}
        {imageUrl && (
          <TouchableOpacity activeOpacity={0.9}>
            <Image 
              source={{ uri: imageUrl }} 
              style={[
                styles.messageImage,
                imageOrientation === 'vertical' ? styles.verticalImage : styles.horizontalImage
              ]} 
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
      {isOwn && avatar && (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  ownContainer: {
    justifyContent: 'flex-end',
  },
  otherContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  ownBubble: {
    backgroundColor: '#F7A10D',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#2A2A2A',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ownText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  messageImage: {
    width: MAX_IMAGE_WIDTH,
    borderRadius: 0,
  },
  horizontalImage: {
    height: MAX_IMAGE_WIDTH / 16 * 9, // 横向16:9的宽高比
  },
  verticalImage: {
    height: MAX_IMAGE_WIDTH / 9 * 16, // 竖向16:9的宽高比
  },
});

export default ChatMessage; 