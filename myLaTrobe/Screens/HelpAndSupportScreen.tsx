/**
 * @file HelpAndSupportScreen.tsx
 * @brief CSE3MAD-Assessment 1 Part 2
 *
 * @author Ry Thomas McLean (21723607)
 *
 * @copyright
 * Copyright (C) 2025  Ry Thomas McLean
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello Welcome to MyLaTrobe! How can I help you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = useCallback(() => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '_bot',
          text: "Welcome!",
          sender: 'bot',
        },
      ]);
    }, 500);
  }, [inputText]);

  const renderItem = useCallback(({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={[
        styles.messageText,
        { color: item.sender === 'user' ? 'rgba(255, 255, 255, 1.0)' : 'rgba(0, 0, 0, 1.0)' }
      ]}>
        {item.text}
      </Text>
    </View>
  ), []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 60, // Approximate item height
          offset: 60 * index,
          index,
        })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          onPress={handleSend} 
          style={styles.sendButton}
          activeOpacity={0.7}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 1.0)', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1.0)',
  },
  messageList: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
    minHeight: 40,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 122, 255, 1.0)',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(229, 229, 234, 1.0)',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: 'rgba(221, 221, 221, 1.0)',
    borderTopWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(241, 241, 241, 1.0)',
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: 'rgba(0, 122, 255, 1.0)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
});

export default ChatScreen;