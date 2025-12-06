import express from 'express'
import { queryWithRAG } from '../langchain/chains.js'

const router = express.Router()

// POST /api/chat - Main chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message } = req.body
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      })
    }
    
    console.log('💬 Received message:', message)
    
    // Query AI with RAG
    const result = await queryWithRAG(message)
    
    res.json({
      response: result.response,
      sources: result.sources,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Chat error:', error)
    
    // Provide helpful error messages
    let errorMessage = 'An error occurred processing your request'
    
    if (error.message.includes('API key')) {
      errorMessage = 'OpenAI API key is missing or invalid. Check your .env file.'
    } else if (error.message.includes('Vector store')) {
      errorMessage = 'Vector store not initialized. Make sure documents are loaded.'
    } else if (error.message.includes('rate limit')) {
      errorMessage = 'OpenAI API rate limit exceeded. Please try again in a moment.'
    }
    
    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

export default router