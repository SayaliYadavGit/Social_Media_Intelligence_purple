import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { getVectorStore } from './vectorstore.js'
import { DOMAIN_CONFIG } from './config.js'

// ✏️ CUSTOMIZE THIS - Main prompt template
const PROMPT_TEMPLATE = `${DOMAIN_CONFIG.systemPrompt}

Context from your social media data:
{context}

User Question: {question}

Provide a comprehensive answer with specific data points, trends, and actionable recommendations. Structure your response with clear sections using emojis as specified in your instructions.`

export async function createChatChain() {
  // Initialize AI model
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: DOMAIN_CONFIG.model.name,
    temperature: DOMAIN_CONFIG.model.temperature,
    maxTokens: DOMAIN_CONFIG.model.maxTokens
  })
  
  // Create prompt template
  const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE)
  
  // Create chain: prompt -> model -> output parser
  const chain = RunnableSequence.from([
    prompt,
    model,
    new StringOutputParser()
  ])
  
  return chain
}

export async function queryWithRAG(question) {
  try {
    console.log('🔍 Processing query:', question)
    
    // Get vector store
    const vectorStore = getVectorStore()
    
    // Retrieve relevant documents
    console.log(`📚 Retrieving top ${DOMAIN_CONFIG.rag.topK} relevant documents...`)
    const retriever = vectorStore.asRetriever({
      k: DOMAIN_CONFIG.rag.topK
    })
    
    const relevantDocs = await retriever.getRelevantDocuments(question)
    console.log(`✅ Found ${relevantDocs.length} relevant documents`)
    
    // Format context from retrieved documents
    const context = relevantDocs
      .map((doc, idx) => `Document ${idx + 1} (${doc.metadata.type}):\n${doc.pageContent}`)
      .join('\n\n---\n\n')
    
    console.log('🤖 Generating AI response...')
    
    // Create and run chain
    const chain = await createChatChain()
    const response = await chain.invoke({
      context,
      question
    })
    
    console.log('✅ Response generated successfully')
    
    return {
      response,
      sources: relevantDocs.map(doc => ({
        type: doc.metadata.type,
        source: doc.metadata.source,
        platform: doc.metadata.platform
      }))
    }
    
  } catch (error) {
    console.error('❌ Error in RAG query:', error)
    throw error
  }
}