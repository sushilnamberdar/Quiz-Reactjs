import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ correctAnswersCount, totalQuestions }) => {
  const navigate = useNavigate();
  const percentage = (correctAnswersCount / totalQuestions) * 100;

  const getFeedbackMessage = (percentage) => {
    if (percentage >= 80) {
      return "Excellent work! 🎉";
    } else if (percentage >= 50) {
      return "Good job! Keep practicing. 😊";
    } else {
      return "Don't worry, try again! 💪";
    }
  };

  useEffect(() => {
    // Any additional effect on component mount can be added here
  }, []);

  const handleRetakeQuiz = () => {
    navigate('/'); // Redirect to the quiz page
  };

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600'>
      <div className='w-[90%] max-w-3xl mt-10 mb-10 p-10 bg-white shadow-xl rounded-lg text-center'>
        <h1 className='text-4xl font-bold mb-5'>Quiz Results</h1>
        <p className='text-2xl mb-5'>
          You answered {correctAnswersCount} out of {totalQuestions} questions correctly.
        </p>
        <p className='text-xl mb-8'>{getFeedbackMessage(percentage)}</p>
        <div className='flex justify-around'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
