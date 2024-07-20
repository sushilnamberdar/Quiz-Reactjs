// src/Slices/Newarrayslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newquearray: [],
  
};

export const newquestionarray = createSlice({
  name: 'newarrayquestion',
  initialState,
  reducers: {
    addnewquestion: (state, action) => {
      state.newquearray = action.payload;
    },
  },
});

export const { addnewquestion } = newquestionarray.actions;

export default newquestionarray.reducer;
