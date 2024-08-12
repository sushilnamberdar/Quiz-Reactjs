import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LearningPage = ({ onQuestionsSelect }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4959/questions');
        const data = response.data;
        categorizeQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
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
      onQuestionsSelect(questions); // Pass the selected questions to the callback
    }
    navigate('/learnquestion');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center mt-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Learning Page</h1>
          <p className="text-lg text-gray-700 mb-8">Explore the categories below.</p>

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
        </div>
      </div>

      <footer className="bg-gray-200 w-full text-center flex items-center justify-center py-4">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LearningPage;
