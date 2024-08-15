import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from './uri';

const WelcomePage = ({ onQuestionsUpdate }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4 sm:top-4 sm:right-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            <Link to='/admin'>
              Admin Login
            </Link>
          </button>
        </div>
        <div className="max-w-2xl w-full text-center sm:top-4 mt-12">
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
      </div>

      <footer className=" bg-gray-200 w-full text-center flex  items-center justify-center ">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default WelcomePage;
