import React, { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import LoadingState from './LoadingState'
import InputForm from './InputForm'

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])
  
  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isUser={msg.role === 'user'}
            />
          ))
        )}
        
        {isLoading && <LoadingState />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-6 pt-0">
        <InputForm onSubmit={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 animate-pulse-slow">🚀</div>
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Welcome to Social Command Center
        </h2>
        <p className="text-gray-400 mb-6">
          Get instant insights about your social media performance. 
          Ask me anything about campaigns, content, or strategy.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="metric-badge bg-primary/20 text-primary border border-primary/50">
            📊 Performance
          </span>
          <span className="metric-badge bg-accent/20 text-accent border border-accent/50">
            ✍️ Content Ideas
          </span>
          <span className="metric-badge bg-success/20 text-success border border-success/50">
            🎯 Strategy
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface