import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import { url } from './uri';

const WelcomePage = ({ onQuestionsUpdate }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`${url}/questions`);
        const data = response.data;
        setQuizQuestions(data);
        categorizeQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);

  const categorizeQuestions = (questions) => {
    const categorized = questions.reduce((acc, question) => {
      const category = question.TOPIC;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    }, {});

    setCategories(Object.keys(categorized).map(category => ({
      name: category,
      questions: categorized[category],
    })));
  };

  const handleCategoryClick = (questions) => {
    onQuestionsUpdate(questions);
    navigate('/quizfeeldetails');
  };

  const handleStartLearning = () => {
    navigate('/learning');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className=" flex items-center justify-between mt-2 ml-2">
          <Link to={'/'}>
            <img className='h-10 w-10' src='./logo.png' alt="Logo" />
          </Link>
          <div className='mr-10 w-40'>
            <Link className="bg-blue-600 w-16 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mr-9" to='/admin'>
              Admin Login
            </Link>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
          {loading ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4 w-full">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div>Loading...</div>
                  <img src='./logo.png' alt="Loading logo" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-2xl w-full text-center mt-12">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to the Quiz App</h1>
                <p className="text-lg text-gray-700 mb-8">Test and improve your knowledge with our quizzes. Choose a category below to get started!</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => handleCategoryClick(category.questions)}
                    >
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                      <p className="text-gray-600">Description for {category.name}. Total Questions {category.questions.length}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg mt-8 hover:bg-green-700 transition-colors"
                onClick={handleStartLearning}
              >
                Start Learning
              </button>
            </>
          )}
        </main>

        <footer className="bg-gray-200 w-full text-center flex items-center justify-center p-4">
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
    </>
  );
};

export default WelcomePage;
