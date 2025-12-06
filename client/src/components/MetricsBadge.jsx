import React from 'react'

const MetricsBadge = ({ trend, value }) => {
  const getTrendConfig = () => {
    switch (trend?.toLowerCase()) {
      case 'up':
      case 'increase':
      case 'positive':
        return {
          icon: '📈',
          color: 'bg-success/20 text-success border-success/50',
          label: 'Up'
        }
      case 'down':
      case 'decrease':
      case 'negative':
        return {
          icon: '📉',
          color: 'bg-alert/20 text-alert border-alert/50',
          label: 'Down'
        }
      case 'stable':
      case 'neutral':
        return {
          icon: '➡️',
          color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
          label: 'Stable'
        }
      default:
        return {
          icon: '📊',
          color: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
          label: 'Metric'
        }
    }
  }
  
  const config = getTrendConfig()
  
  return (
    <span className={`metric-badge border ${config.color} inline-flex items-center space-x-1`}>
      <span>{config.icon}</span>
      <span>{value || config.label}</span>
    </span>
  )
}

export default MetricsBadge