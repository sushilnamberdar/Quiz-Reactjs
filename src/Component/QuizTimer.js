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
    <>
     <div className='flex flex-col sm:flex-row w-full   justify-center sm:justify-end mr-5'>
     <button className=' flex w-52 mb-2 sm:mb-0 sm:mr-5 border-2 p-2 px-8 text-white rounded-3xl bg-[#3597d8]'> <div>TIME LEFT:</div>{"_"+formatTime(timeLeft)}</button>
     </div>
     </>
  );
};

export default QuizTimer;
