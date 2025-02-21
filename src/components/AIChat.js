import React, { useState, useRef, useEffect } from 'react';
import './AIChat.css';
import { FaRobot } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await fetch("https://portfolio-backend-hdxw.onrender.com/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setMessages(prev => [...prev, { 
        text: data.response || 'Sorry, I received an empty response.', 
        sender: 'ai' 
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting to the server. Please try again later.", 
        sender: 'ai' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const TypingIndicator = () => (
    <div className="typing-indicator">
      <div className="typing-bubble"></div>
      <div className="typing-bubble"></div>
      <div className="typing-bubble"></div>
    </div>
  );

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button 
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : <BsChatDots size={24} />}
      </button>
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <FaRobot className="robot-icon" />
            <h3>AI Assistant</h3>
          </div>
          
          <div className="chat-messages" ref={chatBoxRef}>
            {messages.length === 0 && (
              <div className="welcome-message">
                <FaRobot className="welcome-icon" />
                <p>Hello! How can I help you today?</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender}`}
              >
                {message.sender === 'ai' && <FaRobot className="message-icon" />}
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                <FaRobot className="message-icon" />
                <TypingIndicator />
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
              disabled={isTyping}
            />
            <button type="submit" className="send-button" disabled={isTyping || !inputMessage.trim()}>
              <BiSend size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat; 