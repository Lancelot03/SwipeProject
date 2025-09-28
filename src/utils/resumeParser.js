// Lightweight client-side resume parsing helpers.
// NOTE: Client-side PDF and DOCX parsing is limited and may fail for complex resumes.
// For production, use a server-side parser or an AI OCR + document parser API.


import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import mammoth from 'mammoth'


export async function extractTextFromPDF(file) {
const arrayBuffer = await file.arrayBuffer()
const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
const doc = await loadingTask.promise
let text = ''
for (let p = 1; p <= doc.numPages; p++) {
const page = await doc.getPage(p)
const content = await page.getTextContent()
text += content.items.map(i=>i.str).join(' ') + '\n'
}
return text
}


export async function extractTextFromDocx(file) {
const arrayBuffer = await file.arrayBuffer()
const result = await mammoth.extractRawText({ arrayBuffer })
return result.value
}


export function extractNameEmailPhone(text) {
const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
const phoneMatch = text.match(/(\+?\d[\d\-\s]{7,}\d)/)
// naive name extraction: look for capitalized words near top. This is heuristic.
const lines = text.split('\n').map(l=>l.trim()).filter(Boolean)
const possibleName = lines.slice(0,5).find(l => l.split(' ').length<=4 && /^[A-Z][a-z]+(\s+[A-Z][a-z]+)?/.test(l)) || null
return { name: possibleName, email: emailMatch?.[0]||null, phone: phoneMatch?.[0]||null }
}
