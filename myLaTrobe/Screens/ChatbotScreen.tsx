/**
 * @file ChatbootScreen.tsx
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Modal from 'react-native-modal';

const ChatbotScreen = () => {
  const [chatVisible, setChatVisible] = useState(true);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: 'Thank you for your message!' }]);
    setInput('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={chatVisible} onBackdropPress={() => setChatVisible(false)}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, maxHeight: '90%' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Chatbot</Text>
          <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? 'rgba(216,7,22,1.0)' : '#f0f0f0',
                  padding: 10,
                  borderRadius: 8,
                  marginVertical: 4,
                  maxWidth: '80%',
                }}
              >
                <Text>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{
                flex: 1,
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
            />
            <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
              <Text style={{ color: 'rgba(216,7,22,1.0)', fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setChatVisible(false)}
            style={{ marginTop: 20, alignSelf: 'center' }}
          >
            <Text style={{ color: 'red' }}>Close Chat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChatbotScreen;
