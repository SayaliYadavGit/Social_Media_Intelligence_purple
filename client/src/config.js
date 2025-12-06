// ✏️ CUSTOMIZE THIS - Application Configuration
export const APP_CONFIG = {
  // Brand Settings
  appTitle: "Social Command Center",
  appSubtitle: "AI-Powered Marketing Intelligence",
  
  // UI Settings
  colors: {
    primary: '#7c3aed',
    accent: '#ec4899',
    success: '#14b8a6',
    alert: '#f97316'
  },
  
  // Feature Flags
  features: {
    showMetrics: true,
    showBenchmarks: true,
    showContentIdeas: true,
    enableVoiceInput: false // Future feature
  },
  
  // Display Settings
  maxMessagesDisplay: 50,
  typingAnimationSpeed: 20,
  
  // Sample Queries (shown in sidebar)
  sampleQueries: [
    {
      icon: "📊",
      text: "Compare Instagram vs LinkedIn performance this quarter",
      category: "Analysis"
    },
    {
      icon: "📉",
      text: "Why did our engagement drop 30% last week?",
      category: "Diagnosis"
    },
    {
      icon: "✍️",
      text: "Draft 5 post ideas for our product launch",
      category: "Content"
    },
    {
      icon: "🏆",
      text: "Top 3 performing content themes this month",
      category: "Insights"
    },
    {
      icon: "📈",
      text: "Generate weekly performance summary for CMO",
      category: "Reporting"
    },
    {
      icon: "🎯",
      text: "Best posting times for maximum engagement",
      category: "Strategy"
    },
    {
      icon: "💡",
      text: "Content gaps compared to competitors",
      category: "Competitive"
    },
    {
      icon: "🚀",
      text: "Campaign optimization recommendations",
      category: "Optimization"
    }
  ]
}

export default APP_CONFIG