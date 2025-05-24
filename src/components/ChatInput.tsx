import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Type Message"
        placeholderTextColor="#999999"
        value={message}
        onChangeText={setMessage}
        multiline={false}
        autoCorrect={false}
        keyboardAppearance="dark"
        returnKeyType="send"
        enablesReturnKeyAutomatically
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Ionicons name="send" size={24} color="#F7A10D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFFFFF',
    marginHorizontal: 8,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 40,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput; 