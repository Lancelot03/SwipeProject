import { createSlice } from '@reduxjs/toolkit'
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
state.list[id].profile = { ...state.list[id].profile, ...profile }
state.list[id].lastUpdated = Date.now()
},
appendChat: (state, action) => {
const { id, message } = action.payload
state.list[id].chat.push(message)
state.list[id].lastUpdated = Date.now()
},
updateProgress: (state, action) => {
const { id, progress } = action.payload
state.list[id].progress = { ...state.list[id].progress, ...progress }
state.list[id].lastUpdated = Date.now()
},
setFinalScore: (state, action) => {
const { id, score, summary } = action.payload
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


export const { createCandidate, updateProfile, appendChat, updateProgress, setFinalScore, removeCandidate } = slice.actions
export default slice.reducer
