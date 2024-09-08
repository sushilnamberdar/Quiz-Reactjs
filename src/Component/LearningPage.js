import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { url } from './uri';

const LearningPage = ({ onQuestionsSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${url}/questions`);
        const data = response.data;
        categorizeQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchQuestions();
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
    if (onQuestionsSelect) {
      onQuestionsSelect(questions); 
    }
    navigate('/learnquestion');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Link to={'/'}>
      <img className='h-10 w-10 ml-3 mt-3'  src='./logo.png'/>
      </Link>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center mt-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Learning Page</h1>
          <p className="text-lg text-gray-700 mb-8">Explore the categories below.</p>

          {/* Conditional rendering for loader or content */}
          {loading ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div>Loading...</div>
                  <img src='./logo.png'/>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleCategoryClick(category.questions)}
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                  <p className="text-gray-600">Total Questions: {category.questions.length}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
  );
}

export default LearningPage;
