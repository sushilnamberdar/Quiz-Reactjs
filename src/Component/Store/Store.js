import { configureStore } from '@reduxjs/toolkit'
import  newquestionarrayReducer  from '../Slices/Newarrayslice'
import  answerSlice  from '../Slices/AnswerSlice'

export const store = configureStore({
  reducer: {
    newquestionarray: newquestionarrayReducer,
    answer: answerSlice.reducer,
  },
})

