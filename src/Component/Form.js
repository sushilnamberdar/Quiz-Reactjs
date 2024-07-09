import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from './Data';

const Form = ({ newarryafunction }) => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [name, setName] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [canStartQuiz, setCanStartQuiz] = useState(false);

    const handleStartQuiz = () => {
        if (!name.trim() || !mobileno.trim()) {
            alert("Please fill out all fields.");
            setCanStartQuiz(false);
            return;
        }

        if (numQuestions <= 0 || numQuestions > 867) {
            alert("Please enter a valid number of questions (1-867).");
            setCanStartQuiz(false);
            return;
        }

        const maxStartIndex = data.length - numQuestions;
        const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
        const endIndex = startIndex + numQuestions;
        const slicedData = data.slice(startIndex, endIndex);
        console.log("starting index is ", startIndex, "ending index is ", endIndex);
        newarryafunction(startIndex, endIndex);
        setCanStartQuiz(true);
    }

    return (
        <div className='flex items-center justify-center min-h-screen py-12' style={{ background: "#efefef" }}>
            <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Welcome to the Quiz! Fill in the Details</h1>
                <div className='grid gap-4'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name:</label>
                        <input
                            id='name'
                            type='text'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='mobileno' className='block text-sm font-medium text-gray-700'>Phone no:</label>
                        <input
                            id='mobileno'
                            type='number'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                        />
                    </div>
                    <div>Total Questions: 867. Choose a number.</div>
                    <div>
                        <label htmlFor='numQuestions' className='block text-sm font-medium text-gray-700'>Number of Questions:</label>
                        <input
                            id='numQuestions'
                            type='number'
                            placeholder='1-867'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className='mt-10 text-center'>
                    <button
                        onClick={handleStartQuiz}
                        className='inline-block border border-2 border-gray-300 rounded-md shadow-sm p-3 bg-blue-500 text-white hover:bg-blue-600'
                    >
                        Start The Quiz
                    </button>
                    {canStartQuiz && (
                        <Link to='/quiz'>
                            <button
                                className='inline-block border border-2 border-gray-300 rounded-md shadow-sm p-3 bg-green-500 text-white hover:bg-green-600 mt-4'
                            >
                                Go to Quiz
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;
