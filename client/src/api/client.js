import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

class APIClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds for AI processing
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    // Request interceptor for debugging
    this.client.interceptors.request.use(
      (config) => {
        console.log('🚀 API Request:', config.method.toUpperCase(), config.url)
        return config
      },
      (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
      }
    )
    
    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log('✅ API Response:', response.status, response.data)
        return response
      },
      (error) => {
        console.error('❌ Response Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }
  
  async sendMessage(message) {
    try {
      const response = await this.client.post('/chat', { message })
      return response.data
    } catch (error) {
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data.error || 'Server error occurred')
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from server. Is the backend running?')
      } else {
        // Something else happened
        throw new Error(error.message || 'Unknown error occurred')
      }
    }
  }
  
  async healthCheck() {
    try {
      const response = await this.client.get('/health')
      return response.data
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  }
}

export default new APIClient()