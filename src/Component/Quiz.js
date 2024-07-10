import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Result from './Result';
import QuizTimer from './QuizTimer';

const Quiz = () => {
  const newquesdata = useSelector((state) => state.newquestionarray.newquearray);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const itemsPerPage = 36;

  useEffect(() => {
    if (newquesdata && newquesdata.length > 0) {
      setAnswers(new Array(newquesdata.length).fill({ status: 'unattempted', answer: null }));
    }
  }, [newquesdata]);

  if (!newquesdata || newquesdata.length === 0 || answers.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = newquesdata[questionNumber];
  const startingIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startingIndex + itemsPerPage;
  const currentData = newquesdata.slice(startingIndex, endIndex);

  const nextQuestion = () => {
    if (questionNumber < newquesdata.length - 1) {
      setQuestionNumber((prevQuestion) => prevQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleQuestion = (index) => {
    setQuestionNumber(index);
  };

  const selectAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber] = { status: 'attempted', answer };
    setAnswers(updatedAnswers);
  };

  const skipQuestion = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber] = { status: 'skipped', answer: null };
    setAnswers(updatedAnswers);
    nextQuestion();
  };

  const finishQuiz = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer.answer === newquesdata[index].Ans) {
        correctCount++;
      }
    });
    setCorrectAnswersCount(correctCount);
    setShowResult(true);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (endIndex < newquesdata.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center w-full min-h-screen'>
      {showResult ? (
        <Result correctAnswersCount={correctAnswersCount} totalQuestions={newquesdata.length} />
      ) : (
        <div className='w-[90%] max-w-5xl mt-10 mb-10 h-1/2 overflow-hidden shadow-xl bg-white' style={{ boxShadow: '0 -4px 10px -1px #97dbcc, 0px 0px 10px black', borderTop: '4px solid #97dbcc', borderRadius: '10px' }}>
          <div className='p-5'>
            <div className='grid gap-4 sm:flex lg:flex justify-between ml-5 mr-5'>
              <h1 className='font-bold text-3xl font-mono'>Test 03 - CIVICS, POLITICAL SCIENCE</h1>
              <div className='flex items-center mt-5 lg:mt-0 sm:mt-0'>
                <QuizTimer totalTime={newquesdata.length * 1} finishQuiz={finishQuiz} />
              </div>
            </div>
            <div className='flex flex-col lg:flex-row justify-between h-auto mt-10  bg-[#efefef] p-5' style={{ boxShadow: 'inset 0px 0px 7px black' }}>
              <div className='flex flex-col mt-5 lg:mt-0 w-full lg:w-2/3'>
                <div className='font-bold flex text-2xl'>
                  <div className='mr-2'>{questionNumber + 1}.</div>
                  {currentQuestion.Questions}
                </div>
                <div className='option mt-5 text-xl'>
                  <ul className='ml-5'>
                    <li className={` mb-5 cursor-pointer ${answers[questionNumber].answer === 'A' ? 'bg-blue-200' : ''}`} onClick={() => selectAnswer('A')}>A. {currentQuestion.A}</li>
                    <li className={` mb-5 cursor-pointer ${answers[questionNumber].answer === 'B' ? 'bg-blue-200' : ''}`} onClick={() => selectAnswer('B')}>B. {currentQuestion.B}</li>
                    <li className={` mb-5 cursor-pointer ${answers[questionNumber].answer === 'C' ? 'bg-blue-200' : ''}`} onClick={() => selectAnswer('C')}>C. {currentQuestion.C}</li>
                    <li className={` mb-5 cursor-pointer ${answers[questionNumber].answer === 'D' ? 'bg-blue-200' : ''}`} onClick={() => selectAnswer('D')}>D. {currentQuestion.D}</li>
                  </ul>
                </div>
              </div>
              <div className='mt-10 lg:mt-0 bg-white h-auto w-full lg:w-1/3 flex flex-col p-5 rounded-md md:mt-[-10px]' style={{ boxShadow: '0 0 10px gray' }}>
                <h1 className='font-bold'>ANSWER STATUS</h1>
                <div>
                <div className='lg:grid lg:grid-cols-6 lg:h-80 gap-1 mt-5 gird  mg:gird md:grid-cols-6 md:h-80   grid grid-cols-3 mt-1 mb-2 xs:grid-cols-4 xs:h-[400px]'>
                    {currentData.map((item, index) => {
                      const answerState = answers[startingIndex + index]?.status;
                      const bgColor = answerState === 'unattempted' ? 'bg-white' : answerState === 'attempted' ? 'bg-green-600' : 'bg-red-600';
                      return (
                        <button
                          key={index}
                          className={`w-10 h-10  flex text-black items-center justify-center border border2 rounded-3xl  ${bgColor} p-2 active:shadow-lg active:border-4`}
                          onClick={() => handleQuestion(startingIndex + index)}
                        >
                          {startingIndex + index + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className='flex items-center mt-4  justify-between'>
                    <button className='border p-3' onClick={previousPage}>PREVIOUS</button>
                    <button className='border p-3' onClick={nextPage}>NEXT</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full  mt-10 justify-center sm:justify-end mr-5'>
              <button className='mb-2 sm:mb-0 sm:mr-5 border-2 p-2 px-8 text-white rounded-3xl bg-[#14bf9b] active:shadow-lg active:border-2' onClick={skipQuestion}>SKIP</button>
              <button className='mb-2 sm:mb-0 sm:mr-5 border-2 p-2 px-8 text-white rounded-3xl bg-[#3597d8] active:shadow-lg active:border-2' onClick={previousQuestion}>PREVIOUS</button>
              <button className='mb-2 sm:mb-0 sm:mr-5 border-2 p-2 px-8 text-white rounded-3xl bg-[#2fc271] active:shadow-lg active:border-2' onClick={nextQuestion}>NEXT</button>
              <button className='border-2 p-2 px-8 text-white rounded-3xl bg-[#e3523d] active:shadow-lg active:border-4' onClick={finishQuiz}>FINISH</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
