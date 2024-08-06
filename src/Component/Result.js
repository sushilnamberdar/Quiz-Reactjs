import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Result = ({ correctAnswersCount, totalQuestions, uid, uname }) => {
  const navigate = useNavigate();
  const percentage = (correctAnswersCount / totalQuestions) * 100;
  const testDate = new Date().toLocaleDateString();

  const test_result = {
    id: uid,
    totalQuestions,
    correctAnswersCount,
    percentage,
  };

  useEffect(() => {
    axios.post('http://localhost:4959/testresult', test_result)
      .then((response) => {
        console.log(response.data);
        toast.success('Results submitted successfully!');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      });
  }, []);
  const Name = uname.name.toUpperCase();

  const handleRetakeQuiz = () => {
    navigate('/'); // navigate to home page
  };

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600'>
      <div className='w-[90%] max-w-3xl mt-10 mb-10 p-10 bg-white shadow-xl rounded-lg text-center'>
        <h1 className='text-4xl font-bold mb-5'>Certificate of Achievement</h1>
        <p className='text-xl mb-5'>Date: {testDate}</p>
        <p className='text-2xl mb-5'>This certifies that</p>
        <h2 className='text-3xl font-bold mb-5'>{Name}</h2>

        <p className='text-xl mb-5'>has successfully completed the MCQ test with the following results:</p>
        <p className='text-xl mb-5'><span className=' font-bold'>Email:</span> {uname.email}</p>
        <p className='text-xl mb-5'><span className=' font-bold'>Phone:</span> {uname.mobileno}</p>
        <p className='text-xl mb-5'> <span className=' font-bold'>Number of Questions:</span> {totalQuestions}</p>
        <div className='bg-slate-200 mt-10 p-5 rounded-lg  '>
        <p className='text-xl font-bold mb-5'>Got {correctAnswersCount} Marks</p>
        <p className='text-2xl  font-light mb-8'>{percentage.toFixed(2)}%</p>
        </div>
        
        <button
          className='bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleRetakeQuiz}
        >
          Retake Quiz
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Result;
