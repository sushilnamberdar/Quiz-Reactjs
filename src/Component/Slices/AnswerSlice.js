// src/Slices/AnswerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerbyuser:[],
  answer:[],
  isCorrect:[]
};

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionId, answer, correctAnswer } = action.payload;
      state.answers[questionId] = {
        userAnswer: answer,
        isCorrect: answer === correctAnswer,
      };
    },
  },
});

export const { setAnswer } = answerSlice.actions;

export default answerSlice.reducer;