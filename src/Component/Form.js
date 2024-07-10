import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from './Data';

const Form = ({ newarryafunction }) => {
    const [name, setName] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        if (!name.trim() || !mobileno.trim()) {
            alert("Please fill out all fields.");
            return;
        }

        if (numQuestions <= 0 || numQuestions > 867) {
            alert("Please select a valid number of questions.");
            return;
        }

        const maxStartIndex = data.length - numQuestions;
        const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
        const endIndex = startIndex + numQuestions;
        const slicedData = data.slice(startIndex, endIndex);
        console.log("starting index is ", startIndex, "ending index is ", endIndex);
        newarryafunction(startIndex, endIndex);

        navigate('/quiz');
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
                            type='text'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='numQuestions' className='block text-sm font-medium text-gray-700'>Number of Questions:</label>
                        <select
                            id='numQuestions'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                        >
                            <option value={0}>Select</option>
                            <option value={30}>30 Questions</option>
                            <option value={50}>50 Questions</option>
                        </select>
                    </div>
                </div>
                <div className='mt-10 text-center'>
                    <button
                        onClick={handleStartQuiz}
                        className='inline-block border border-2 border-gray-300 rounded-md shadow-sm p-3 bg-blue-500 text-white hover:bg-blue-600'
                    >
                        Start The Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Form;
