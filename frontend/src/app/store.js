import {configureStore} from '@reduxjs/toolkit'
import notesReducer from '../features/notes/notesSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        user: userReducer
    }
})