import React from 'react'

const LoadingState = () => {
  return (
    <div className="flex items-start space-x-4 p-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent 
                      flex items-center justify-center flex-shrink-0">
        <span className="text-xl">🤖</span>
      </div>
      
      <div className="flex-1 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" 
               style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" 
               style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-success animate-bounce" 
               style={{ animationDelay: '300ms' }}></div>
          <span className="text-sm text-gray-400 ml-2">
            Analyzing your data...
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingState