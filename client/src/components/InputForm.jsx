import React, { useState, useRef, useEffect } from 'react'

const InputForm = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSubmit(input.trim())
      setInput('')
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="glass-card p-4">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your social media performance..."
            disabled={isLoading}
            rows="1"
            className="w-full bg-white/5 text-white placeholder-gray-500 
                     rounded-lg px-4 py-3 resize-none focus:outline-none 
                     focus:ring-2 focus:ring-primary border border-white/10
                     disabled:opacity-50 disabled:cursor-not-allowed
                     max-h-32 overflow-y-auto"
          />
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-primary to-accent text-white 
                   px-6 py-3 rounded-lg font-semibold
                   hover:shadow-lg hover:scale-105 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   disabled:hover:scale-100
                   transition-all duration-200 flex-shrink-0"
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" 
                        stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Send</span>
              <span>→</span>
            </span>
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  )
}

export default InputForm