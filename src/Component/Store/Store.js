import { configureStore } from '@reduxjs/toolkit'
import  newquestionarrayReducer  from '../Slices/Newarrayslice'

export const store = configureStore({
  reducer: {
    newquestionarray: newquestionarrayReducer,
  
  },
})

