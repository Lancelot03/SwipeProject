import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
list: {}, // keyed by id
order: [] // candidate ids in created order (newest first)
}
const slice = createSlice({
name: 'candidates',
initialState,
reducers: {
createCandidate: (state, action) => {
const id = uuidv4()
state.list[id] = {
id,
profile: action.payload.profile || {},
chat: [],
progress: { questionIndex: 0, status: 'not_started' },
scores: [],
finalScore: null,
summary: null,
lastUpdated: Date.now()
}
state.order.unshift(id)
},
updateProfile: (state, action) => {
const { id, profile } = action.payload
if(!state.list[id]) return
state.list[id].profile = { ...state.list[id].profile, ...profile }
state.list[id].lastUpdated = Date.now()
},
appendChat: (state, action) => {
const { id, message } = action.payload
if(!state.list[id]) return
state.list[id].chat.push(message)
state.list[id].lastUpdated = Date.now()
},
updateProgress: (state, action) => {
const { id, progress } = action.payload
if(!state.list[id]) return
state.list[id].progress = { ...state.list[id].progress, ...progress }
state.list[id].lastUpdated = Date.now()
},
addScore: (state, action) => {
const { id, score } = action.payload
if(!state.list[id]) return
state.list[id].scores.push(score)
state.list[id].lastUpdated = Date.now()
},
setFinalScore: (state, action) => {
const { id, score, summary } = action.payload
if(!state.list[id]) return
state.list[id].finalScore = score
state.list[id].summary = summary
state.list[id].progress.status = 'finished'
state.list[id].lastUpdated = Date.now()
},
removeCandidate: (state, action) => {
const id = action.payload
delete state.list[id]
state.order = state.order.filter(x=>x!==id)
}
}
})


export const { createCandidate, updateProfile, appendChat, updateProgress, addScore, setFinalScore, removeCandidate } = slice.actions
export default slice.reducer
