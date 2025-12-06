import React from 'react'
import { APP_CONFIG } from '../config'

const Sidebar = ({ onQuerySelect, isLoading }) => {
  return (
    <div className="w-80 glass-card p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          {APP_CONFIG.appTitle}
        </h2>
        <p className="text-sm text-gray-400">
          {APP_CONFIG.appSubtitle}
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-gray-400">AI Ready</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
          Try These Queries
        </h3>
        
        <div className="space-y-2">
          {APP_CONFIG.sampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => onQuerySelect(query.text)}
              disabled={isLoading}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 
                       border border-white/10 hover:border-primary/50 
                       transition-all duration-200 group disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{query.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 group-hover:text-white">
                    {query.text}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    {query.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-500 space-y-2">
          <p>💡 <strong>Tip:</strong> Ask specific questions about metrics, campaigns, or content strategy</p>
          <p>🎯 The AI analyzes your data to provide actionable insights</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar