import React, { useEffect, useState } from 'react';

const QuizTimer = ({ totalTime, finishQuiz }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      finishQuiz();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, finishQuiz]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='ml-5 p-3 flex items-center text-white text-lg' style={{ backgroundColor: '#4e86b5', borderRadius: '30px', minWidth: '100px' }}>
      <div className='w-20'>Time Left:</div>
      <div className='ml-2'>{formatTime(timeLeft)}</div>
    </div>
  );
};

export default QuizTimer;
