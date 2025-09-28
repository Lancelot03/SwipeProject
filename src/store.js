import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import candidatesReducer from './features/candidatesSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'


const rootReducer = combineReducers({ candidates: candidatesReducer })


const persistConfig = { key: 'root', storage }
const persisted = persistReducer(persistConfig, rootReducer)


export const store = configureStore({ reducer: persisted })
export const persistor = persistStore(store)
