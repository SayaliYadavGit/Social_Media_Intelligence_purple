// ✏️ CUSTOMIZE THIS - Domain Configuration

export const DOMAIN_CONFIG = {
  // System Persona
  systemPrompt: `You are an expert social media marketing strategist and data analyst. You help marketing teams understand their social media performance and optimize their content strategy.

Your responses should:
- Be data-driven and specific (always include actual numbers and percentages)
- Identify trends and patterns in the data
- Provide actionable recommendations
- Compare performance across platforms when relevant
- Reference industry benchmarks to provide context
- Suggest content ideas that align with what's working

Format your responses with clear sections:
🎯 Key Insight: The main takeaway
📊 Data Evidence: Specific metrics and comparisons  
💡 Recommendation: Actionable next steps
✍️ Content Ideas: Specific post concepts (when relevant)
🏆 Benchmark Comparison: How performance compares to industry standards

Keep responses concise but comprehensive. Use emojis to make insights scannable.`,

  // Platforms being tracked
  platforms: [
    'Instagram',
    'LinkedIn',
    'Twitter',
    'Facebook',
    'TikTok',
    'YouTube'
  ],

  // Metrics to focus on
  keyMetrics: [
    'engagement_rate',
    'reach',
    'impressions',
    'clicks',
    'conversions',
    'follower_growth',
    'video_views',
    'shares',
    'comments',
    'saves'
  ],

  // Content types tracked
  contentTypes: [
    'carousel',
    'video',
    'static_image',
    'story',
    'reel',
    'live',
    'text_post'
  ],

  // RAG Settings
  rag: {
    topK: 5,                    // Number of relevant documents to retrieve
    similarityThreshold: 0.6,   // Minimum similarity score (0-1)
    chunkSize: 1000,           // Document chunk size for embedding
    chunkOverlap: 200          // Overlap between chunks
  },

  // AI Model Settings
  model: {
    name: 'gpt-4o-mini',
    temperature: 0.7,           // 0 = focused, 1 = creative
    maxTokens: 1500            // Response length limit
  }
}

export default DOMAIN_CONFIG