import React from 'react';

const Result = ({ correctAnswersCount, totalQuestions }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <div className='w-[90%] max-w-3xl mt-10 mb-10 p-10 bg-white shadow-xl rounded-lg'>
        <h1 className='text-4xl font-bold mb-5'>Quiz Results</h1>
        <p className='text-2xl'>Correct  answered {correctAnswersCount} out of {totalQuestions} questions correctly.</p>
      </div>
    </div>
  );
};

export default Result;
