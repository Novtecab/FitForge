
import React, { useState, useRef, useEffect } from 'react';
import { IconMessageCircle, IconSend, IconX } from '../constants';
import { getChatResponse } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hey! I'm ForgeBot. How can I help you get started today? 🔥" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await getChatResponse(inputValue);
      const botMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        console.error(error);
        const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110"
          aria-label="Toggle chat"
        >
          {isOpen ? <IconX className="w-8 h-8" /> : <IconMessageCircle className="w-8 h-8" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
          <header className="bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">FitForge Assistant</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-sm ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-white rounded-br-none'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none'
                  }`}>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end justify-start">
                    <div className="px-4 py-2 rounded-2xl max-w-xs md:max-w-sm bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none">
                        <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        </div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about products or services..."
                className="w-full bg-transparent p-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                disabled={isLoading}
              />
              <button onClick={handleSendMessage} disabled={isLoading} className="p-3 text-cyan-500 dark:text-cyan-400 hover:text-cyan-400 dark:hover:text-cyan-300 disabled:text-gray-500 transition-colors">
                <IconSend className="w-6 h-6"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;