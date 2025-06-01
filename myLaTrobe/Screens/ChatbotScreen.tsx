/**
 * @file ChatbotScreen.tsx
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
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';

const ChatbotScreen = () => {
  const [chatVisible, setChatVisible] = useState(true);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef(null);

  const sendMessage = useCallback(() => {
    if (input.trim() === '') return;

    const newMessages = [
      ...messages, 
      { sender: 'user', text: input }, 
      { sender: 'bot', text: 'Thank you for your message!' }
    ];
    
    setMessages(newMessages);
    setInput('');
    

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [input, messages]);

  const handleCloseChat = useCallback(() => {
    setChatVisible(false);
  }, []);


  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <Modal 
        isVisible={chatVisible} 
        onBackdropPress={handleCloseChat}
        avoidKeyboard={true}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{ 
            backgroundColor: 'rgba(255, 255, 255, 1.0)', 
            padding: 20, 
            borderRadius: 10, 
            maxHeight: '90%',
            minHeight: 400
          }}>
            <Text style={{ 
              fontSize: 18, 
              marginBottom: 10, 
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 1.0)'
            }}>
              Chatbot
            </Text>
            
            <ScrollView 
              ref={scrollViewRef}
              style={{ maxHeight: 300, marginBottom: 10 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {messages.map((msg, index) => (
                <View
                  key={`message-${index}`}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? 'rgba(0, 122, 255, 1.0)' : 'rgba(240, 240, 240, 1.0)',
                    padding: 10,
                    borderRadius: 8,
                    marginVertical: 4,
                    maxWidth: '80%',
                  }}
                >
                  <Text style={{ 
                    color: msg.sender === 'user' ? 'rgba(255, 255, 255, 1.0)' : 'rgba(0, 0, 0, 1.0)' 
                  }}>
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <TextInput
                style={{
                  flex: 1,
                  borderColor: 'rgba(200, 200, 200, 1.0)',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: 'rgba(255, 255, 255, 1.0)',
                  color: 'rgba(0, 0, 0, 1.0)'
                }}
                value={input}
                onChangeText={setInput}
                placeholder="Type your message..."
                placeholderTextColor="rgba(150, 150, 150, 1.0)"
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity 
                onPress={sendMessage} 
                style={{ 
                  marginLeft: 10,
                  backgroundColor: 'rgba(0, 122, 255, 1.0)',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 5
                }}
                activeOpacity={0.7}
              >
                <Text style={{ color: 'rgba(255, 255, 255, 1.0)', fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleCloseChat}
              style={{ 
                marginTop: 10, 
                alignSelf: 'center',
                backgroundColor: 'rgba(240, 240, 240, 1.0)',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'rgba(220, 53, 69, 1.0)', fontWeight: 'bold' }}>Close Chat</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default ChatbotScreen;