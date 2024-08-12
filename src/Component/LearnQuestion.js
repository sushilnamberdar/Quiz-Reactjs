import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LearnQuestion = ({ questions = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 2;
  const [isReload,setIsReload] = useState(false)
  // Initialize feedbackState for all questions
  const [feedbackState, setFeedbackState] = useState(
    questions.map(() => ({ selectedAnswer: null, showFeedback: false }))
  );

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  // total page
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOptionClick = (questionIndex, selectedOption) => {
    const globalQuestionIndex = startIndex + questionIndex;

  
    if (globalQuestionIndex < feedbackState.length) {
      const newFeedbackState = [...feedbackState];
      newFeedbackState[globalQuestionIndex] = {
        selectedAnswer: selectedOption,
        showFeedback: true,
      };
      setFeedbackState(newFeedbackState);
    }
  };

  useEffect(() => {
    const handleReload = () => {
      setIsReload(true);
    };
    window.addEventListener('beforeunload', handleReload);
    return () => {
      window.removeEventListener('beforeunload', handleReload);
    };
  }, );

  if (isReload) {
    window.location.href = '/learning';
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center mt-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Learning Questions</h1>
          <div className="grid grid-cols-1 gap-6 mb-6">
            {currentQuestions.map((question, index) => {
              const globalQuestionIndex = startIndex + index;
              const feedback = feedbackState[globalQuestionIndex] || {};
              return (
                <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{question.Questions}</h2>
                  
                  <div className="flex flex-col gap-2">
                    {['A', 'B', 'C', 'D'].map(option => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(index, option)}
                        className={`p-2 rounded ${
                          feedback.selectedAnswer === option
                            ? (question.Ans === option ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {option}: {question[option]}
                      </button>
                    ))}
                  </div>
                  
                  {feedback.showFeedback && (
                    <div className="mt-4 text-lg">
                      {feedback.selectedAnswer === question.Ans 
                        ? <span className="text-green-600">Correct!</span> 
                        : <span className="text-red-600">Wrong! The correct answer is {question.Ans}: {question[question.Ans]}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next button previous button  */}
          <div className="flex justify-between w-full mb-4">
            <button
              onClick={handlePrevPage}
              className={`p-2 bg-blue-500 text-white rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage + 1} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              className={`p-2 bg-blue-500 text-white rounded ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>

          {/* homw page and learning page */}
          <div className="flex justify-between w-full mt-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <Link to="/learning" className="text-blue-500 hover:underline">Learning Page</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 w-full text-center flex items-center justify-center py-4 mt-8">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LearnQuestion;
