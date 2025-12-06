import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { Document } from 'langchain/document'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { DOMAIN_CONFIG } from './config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../data')

let vectorStore = null

export async function initializeVectorStore() {
  try {
    console.log('📂 Loading documents from:', DATA_DIR)
    
    // Load all documents from data folder
    const documents = await loadDocuments()
    console.log(`✅ Loaded ${documents.length} document chunks`)
    
    // Create embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small'
    })
    
    // Create in-memory vector store (no external ChromaDB needed!)
    console.log('🧠 Creating in-memory vector store...')
    vectorStore = await MemoryVectorStore.fromDocuments(
      documents,
      embeddings
    )
    
    console.log('✅ Vector store created successfully')
    return vectorStore
    
  } catch (error) {
    console.error('❌ Error initializing vector store:', error)
    throw error
  }
}

export function getVectorStore() {
  if (!vectorStore) {
    throw new Error('Vector store not initialized. Call initializeVectorStore() first.')
  }
  return vectorStore
}

async function loadDocuments() {
  const documents = []
  
  try {
    // Text splitter for chunking documents
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: DOMAIN_CONFIG.rag.chunkSize,
      chunkOverlap: DOMAIN_CONFIG.rag.chunkOverlap
    })
    
    // Load campaign performance JSON
    const campaignPath = path.join(DATA_DIR, 'campaign_performance.json')
    if (await fileExists(campaignPath)) {
      const campaignData = await fs.readFile(campaignPath, 'utf-8')
      const campaigns = JSON.parse(campaignData)
      
      for (const campaign of campaigns) {
        const content = `Campaign: ${campaign.name}
Platform: ${campaign.platform}
Date Range: ${campaign.date_range}
Performance Metrics:
- Engagement Rate: ${campaign.metrics.engagement_rate}%
- Reach: ${campaign.metrics.reach}
- Impressions: ${campaign.metrics.impressions}
- Clicks: ${campaign.metrics.clicks}
- Conversions: ${campaign.metrics.conversions}
Content Type: ${campaign.content_type}
Budget: $${campaign.budget}
ROI: ${campaign.roi}x`

        documents.push(new Document({
          pageContent: content,
          metadata: {
            type: 'campaign',
            platform: campaign.platform,
            date: campaign.date_range,
            source: 'campaign_performance.json'
          }
        }))
      }
      console.log(`✅ Loaded campaign data: ${campaigns.length} campaigns`)
    }
    
    // Load content library TXT
    const contentPath = path.join(DATA_DIR, 'content_library.txt')
    if (await fileExists(contentPath)) {
      const contentText = await fs.readFile(contentPath, 'utf-8')
      const contentChunks = await textSplitter.splitText(contentText)
      
      contentChunks.forEach(chunk => {
        documents.push(new Document({
          pageContent: chunk,
          metadata: {
            type: 'content',
            source: 'content_library.txt'
          }
        }))
      })
      console.log(`✅ Loaded content library: ${contentChunks.length} chunks`)
    }
    
    // Load brand guidelines JSON
    const guidelinesPath = path.join(DATA_DIR, 'brand_guidelines.json')
    if (await fileExists(guidelinesPath)) {
      const guidelinesData = await fs.readFile(guidelinesPath, 'utf-8')
      const guidelines = JSON.parse(guidelinesData)
      
      const content = `Brand Voice: ${guidelines.voice}
Tone: ${guidelines.tone.join(', ')}
Topics: ${guidelines.topics.join(', ')}
Hashtag Strategy: ${guidelines.hashtag_strategy}
Posting Schedule: ${Object.entries(guidelines.posting_schedule).map(([k,v]) => `${k}: ${v}`).join(', ')}
Don'ts: ${guidelines.donts.join(', ')}`

      documents.push(new Document({
        pageContent: content,
        metadata: {
          type: 'guidelines',
          source: 'brand_guidelines.json'
        }
      }))
      console.log(`✅ Loaded brand guidelines`)
    }
    
    // Load industry benchmarks CSV
    const benchmarksPath = path.join(DATA_DIR, 'industry_benchmarks.csv')
    if (await fileExists(benchmarksPath)) {
      const csvText = await fs.readFile(benchmarksPath, 'utf-8')
      const lines = csvText.split('\n').filter(line => line.trim())
      const headers = lines[0].split(',')
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',')
        const row = {}
        headers.forEach((header, idx) => {
          row[header.trim()] = values[idx]?.trim()
        })
        
        const content = `Industry Benchmark - ${row.platform}:
Average Engagement Rate: ${row.avg_engagement_rate}
Average Reach: ${row.avg_reach}
Average CTR: ${row.avg_ctr}
Best Posting Time: ${row.best_posting_time}
Content Type Performance: ${row.top_content_type}`

        documents.push(new Document({
          pageContent: content,
          metadata: {
            type: 'benchmark',
            platform: row.platform,
            source: 'industry_benchmarks.csv'
          }
        }))
      }
      console.log(`✅ Loaded industry benchmarks: ${lines.length - 1} platforms`)
    }
    
  } catch (error) {
    console.error('❌ Error loading documents:', error)
    throw error
  }
  
  return documents
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}