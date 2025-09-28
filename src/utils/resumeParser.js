import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import mammoth from 'mammoth'

// Extract text from PDF
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer()
  const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    text += content.items.map(i => i.str).join(' ') + '\n'
  }
  return text
}

// Extract text from DOCX
export async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

// Improved field extraction from text
export function extractNameEmailPhone(text) {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  const phoneMatch = text.match(/(\+?\d[\d\s\-\(\)]{7,}\d)/)

  // Better name extraction:
  // 1. Look for line starting with "Name" or near top
  // 2. Fallback: first line with 2-4 words, all capitalized first letters
  let name = null
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

  // Check for line starting with "Name:"
  const nameLine = lines.find(l => /^name[:\s]/i.test(l))
  if (nameLine) {
    name = nameLine.split(':')[1]?.trim() || null
  }

  // Fallback: first line with 2-4 words, capitalized
  if (!name) {
    const candidate = lines.slice(0, 10).find(l => {
      const words = l.split(' ')
      return words.length >= 2 && words.length <= 4 && words.every(w => /^[A-Z]/.test(w))
    })
    name = candidate || null
  }

  return {
    name: name || 'Unknown',
    email: emailMatch?.[0] || 'Unknown',
    phone: phoneMatch?.[0] || 'Unknown'
  }
}
