import { GoogleGenerativeAI } from '@google/generative-ai'
interface Chat {
  role: 'user' | 'model'
  parts: string
}

const apiKey = 'AIzaSyCWP-KKTOO3YCQ1-pqZsCIxxO96XOG2LqI'
const genAI = new GoogleGenerativeAI(apiKey)

export async function run(prompt: string, history: Chat[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 1000
    }
  })

  const result = await chat.sendMessage(prompt)
  const response = await result.response
  const output = response.text()

  return output
}
