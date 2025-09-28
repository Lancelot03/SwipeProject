// Placeholder functions — integrate OpenAI or another LLM here.
// Example: generateQuestion(role, difficulty, prevContext)


export async function generateQuestion(role = 'fullstack', difficulty = 'easy', context = {}) {
// Return { id, text }
// For demo, we use static questions. Replace with API call.
const pools = {
easy: [ 'Explain props vs state in React?', 'What is an HTTP GET vs POST?' ],
medium: [ 'How would you optimize a React app for performance?', 'Explain CORS and how to handle it.' ],
hard: [ 'Design an authentication system for a distributed app.', 'Explain how to debug a memory leak in Node.js.' ]
}
const text = pools[difficulty][Math.floor(Math.random()*pools[difficulty].length)]
return { id: Date.now().toString(), text }
}


export async function gradeAnswer(question, answer) {
// Replace this with an LLM call that returns a numeric score and feedback.
// For starter: simple heuristic length-based score + canned feedback
const len = (answer||'').trim().length
let score = Math.min(10, Math.round(len/20))
const feedback = score>6 ? 'Good answer — shows understanding.' : 'Answer needs more depth or examples.'
return { score, feedback }
}


export async function finalSummary(chat, scores) {
// Replace with LLM summary. Here we produce a short aggregated summary.
const avg = Math.round((scores.reduce((a,b)=>a+b,0)/scores.length) || 0)
const summary = `Candidate answered ${scores.length} questions with average score ${avg}/10.`
return { finalScore: avg, summary }
}
