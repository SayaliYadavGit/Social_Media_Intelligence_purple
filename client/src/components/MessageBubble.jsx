import React from 'react'
import MetricsBadge from './MetricsBadge'

const MessageBubble = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-2xl">
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-2xl 
                          rounded-tr-sm shadow-lg">
            <p className="text-white">{message.text}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    )
  }
  
  // AI Response
  return (
    <div className="flex items-start space-x-4 mb-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent 
                      flex items-center justify-center flex-shrink-0 shadow-lg">
        <span className="text-xl">🤖</span>
      </div>
      
      <div className="flex-1 max-w-3xl">
        <div className="glass-card p-5 shadow-xl">
          <AIResponse response={message.response} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

const AIResponse = ({ response }) => {
  // Parse sections from response
  const sections = parseResponse(response)
  
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div key={index}>
          {section.type === 'heading' && (
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <span>{section.icon}</span>
              <span>{section.text}</span>
            </h3>
          )}
          
          {section.type === 'paragraph' && (
            <p className="text-gray-200 leading-relaxed">{section.text}</p>
          )}
          
          {section.type === 'metric' && (
            <div className="flex flex-wrap gap-2 my-3">
              {section.metrics.map((metric, i) => (
                <MetricsBadge key={i} trend={metric.trend} value={metric.value} />
              ))}
            </div>
          )}
          
          {section.type === 'list' && (
            <ul className="space-y-2 my-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          {section.type === 'recommendation' && (
            <div className="bg-success/10 border border-success/30 rounded-lg p-4 my-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-success mb-1">Recommendation</h4>
                  <p className="text-gray-200">{section.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Helper function to parse AI response into structured sections
const parseResponse = (text) => {
  const sections = []
  const lines = text.split('\n').filter(line => line.trim())
  
  let currentSection = null
  
  lines.forEach(line => {
    const trimmed = line.trim()
    
    // Detect headings (contains emoji or ends with :)
    if (/^[🎯📊💡📈📉✨🚀🏆]/.test(trimmed) || trimmed.endsWith(':')) {
      if (currentSection) sections.push(currentSection)
      currentSection = {
        type: 'heading',
        icon: trimmed.match(/^([🎯📊💡📈📉✨🚀🏆])/)?.[1] || '📌',
        text: trimmed.replace(/^[🎯📊💡📈📉✨🚀🏆]\s*/, '').replace(/:$/, '')
      }
    }
    // Detect list items
    else if (/^[-•*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      if (!currentSection || currentSection.type !== 'list') {
        if (currentSection) sections.push(currentSection)
        currentSection = { type: 'list', items: [] }
      }
      currentSection.items.push(trimmed.replace(/^[-•*]\s/, '').replace(/^\d+\.\s/, ''))
    }
    // Regular paragraph
    else {
      if (currentSection && currentSection.type === 'heading') {
        sections.push(currentSection)
        currentSection = null
      }
      sections.push({ type: 'paragraph', text: trimmed })
    }
  })
  
  if (currentSection) sections.push(currentSection)
  
  return sections
}

export default MessageBubble