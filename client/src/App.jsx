import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatInterface from './components/ChatInterface'
import apiClient from './api/client'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('checking')
  
  // Check backend connection on mount
  useEffect(() => {
    checkConnection()
  }, [])
  
  const checkConnection = async () => {
    try {
      const health = await apiClient.healthCheck()
      setConnectionStatus(health.status === 'ok' ? 'connected' : 'error')
      console.log('✅ Backend connected:', health)
    } catch (error) {
      setConnectionStatus('error')
      console.error('❌ Backend connection failed:', error)
    }
  }
  
  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      // Send to backend
      const response = await apiClient.sendMessage(text)
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        response: response.response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      
    } catch (error) {
      console.error('❌ Error sending message:', error)
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        response: `⚠️ Error: ${error.message}\n\nPlease check:\n- Is the backend server running?\n- Is your OpenAI API key configured?\n- Check the console for details.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleQuerySelect = (query) => {
    handleSendMessage(query)
  }
  
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar onQuerySelect={handleQuerySelect} isLoading={isLoading} />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="glass-card m-6 mb-0 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Marketing Assistant</h1>
            <p className="text-sm text-gray-400">Powered by GPT-4o-mini + RAG</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <ConnectionIndicator status={connectionStatus} />
            <button
              onClick={() => setMessages([])}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                       border border-white/10 text-sm transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </header>
        
        {/* Chat Interface */}
        <div className="flex-1 m-6 mt-6 glass-card overflow-hidden">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

const ConnectionIndicator = ({ status }) => {
  const config = {
    connected: { color: 'bg-success', text: 'Connected', icon: '●' },
    error: { color: 'bg-alert', text: 'Disconnected', icon: '●' },
    checking: { color: 'bg-yellow-500', text: 'Connecting...', icon: '○' }
  }
  
  const current = config[status] || config.checking
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${current.color} animate-pulse`}></span>
      <span className="text-gray-400">{current.text}</span>
    </div>
  )
}

export default App