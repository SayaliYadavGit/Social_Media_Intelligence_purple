import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRoutes from './routes/chat.js'
import { initializeVectorStore } from './langchain/vectorstore.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Social Command Center API',
    version: '1.0.0'
  })
})

// Chat routes
app.use('/api/chat', chatRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err)
  res.status(500).json({
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

// Initialize vector store and start server
async function startServer() {
  try {
    console.log('🚀 Initializing Social Command Center...')
    
    // Initialize vector store with documents
    console.log('📚 Loading documents into vector store...')
    await initializeVectorStore()
    console.log('✅ Vector store initialized successfully')
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
      console.log(`📊 API endpoints:`)
      console.log(`   - Health: http://localhost:${PORT}/api/health`)
      console.log(`   - Chat: http://localhost:${PORT}/api/chat`)
      console.log(`\n🤖 AI Assistant ready to analyze your social media data!`)
    })
    
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()