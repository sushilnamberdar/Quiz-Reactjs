import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Result = ({ correctAnswersCount, totalQuestions ,uid }) => {
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
  console.log('userid in result ',uid.userid);
  const test_result = {
    id:uid.userid,
    totalQuestions,
    correctAnswersCount,
    percentage,
  }
  console.log('result object ',test_result)

  useEffect(() => {
      axios.post('http://localhost:4959/testresult',test_result).then((Response) => {
        console.log(Response.data);

      }).catch((error) => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      })

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
