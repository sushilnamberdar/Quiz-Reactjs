import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { url } from './uri';
import { FaLinkedin } from 'react-icons/fa';

const Result = ({ correctAnswersCount, totalQuestions, uid, uname, userAnswers }) => {
  const navigate = useNavigate();
  const percentage = (correctAnswersCount / totalQuestions) * 100;
  const testDate = new Date().toLocaleDateString();

  const attemptedQuestions = userAnswers.filter(answer => answer.status === 'attempted');

  const test_result = {
    id: uid,
    totalQuestions,
    correctAnswersCount,
    percentage,
    attemptedQuestions: attemptedQuestions.map(({ status, answer, correctAnswer, Questionid }) => ({
      status,
      answer,
      correctAnswer,
      Questionid
    })),
  };

  useEffect(() => {
    axios.post(`${url}/testresult`, test_result)
      .then((response) => {
        toast.success('Results submitted successfully!');
      })
      .catch((error) => {
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
    <div className='w-full min-h-screen flex flex-col justify-between'>
      <div className='absolute'>
        <Link to={'/'}>
          <img className='h-10 w-10 ml-3 mt-3' src='./logo.png' alt='Logo' />
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center w-full grow bg-gradient-to-r from-green-400 via-blue-500 to-purple-600'>
        <div className='w-[90%] max-w-3xl mt-40 lg:mt-1 mb-10 p-10 bg-white shadow-xl rounded-lg text-center'>
          <h1 className='text-4xl font-bold mb-5'>Certificate of Achievement</h1>
          <p className='text-xl mb-5'>Date: {testDate}</p>
          <p className='text-2xl mb-5'>This certifies that</p>
          <h2 className='text-3xl font-bold mb-5'>{Name}</h2>
          <p className='text-xl mb-5'>has successfully completed the MCQ test with the following results:</p>
          <p className='text-xl mb-5'><span className=' font-bold'>Email:</span> {uname.email}</p>
          <p className='text-xl mb-5'><span className=' font-bold'>Phone:</span> {uname.mobileno}</p>
          <p className='text-xl mb-5'><span className=' font-bold'>Number of Questions:</span> {totalQuestions}</p>
          <div className='bg-slate-200 mt-10 p-5 rounded-lg'>
            <p className='text-xl font-bold mb-5'>Got {correctAnswersCount} Marks</p>
            <p className='text-2xl font-light mb-8'>{percentage.toFixed(2)}%</p>
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
      <footer className="bg-gray-200 w-full text-center flex items-center fixed bottom-0 justify-center p-4">
        <p className="text-gray-600 flex items-center">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.{' '}
          <a 
            href="https://www.linkedin.com/in/sushilnamberdar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-2 flex items-center"
          >
            <FaLinkedin className="text-blue-700 mr-1" />
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Result;
