import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLinkedin } from 'react-icons/fa';
import { url } from './uri';

const Form = ({ newarryafunction, onid, username, questiondata }) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [email, setEmail] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [isReload, setIsReload] = useState(false);
    const navigate = useNavigate();
    const [startQuizButton, setStartQuizButton] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobileno: '',
    });

    useEffect(() => {
        if (questiondata && questiondata.length > 0) {
            setData(questiondata);
        }
    }, [questiondata]);

    const handleStartQuiz = () => {
        if (!name.trim() || !mobileno.trim() || !email.trim()) {
            toast.error("Please fill out all fields.");
            return;
        }

        if (numQuestions <= 0 || numQuestions > 50) {
            toast.error("Please select a valid number of questions.");
            return;
        }

        const maxStartIndex = data.length - numQuestions;
        const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
        const endIndex = startIndex + numQuestions;
        const slicedData = data.slice(startIndex, endIndex);
        newarryafunction(startIndex, endIndex);
        setStartQuizButton(true);
    };

    useEffect(() => {
        if (startQuizButton) {
            axios.post(`${url}/userdetails`, userDetails).then((response) => {
                toast.success(response.data.message + " " + 'Quiz started successfully!');
                const uname = response.data.existingUser;
                username(uname);

                const userId = response.data.existingUser._id;
                onid(userId);

                navigate('/quiz');
            }).catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            }).finally(() => {
                setStartQuizButton(false);
            });
        }
    }, [startQuizButton]);

    const nameField = (e) => {
        const value = e.target.value;
        setName(value);
        setUserDetails((prevVal) => ({ ...prevVal, name: value }));
    };

    const emailField = (e) => {
        const value = e.target.value;
        setEmail(value);
        setUserDetails((prevVal) => ({ ...prevVal, email: value }));
    };

    const phoneNumber = (e) => {
        const value = e.target.value;
        setMobileno(value);
        setUserDetails((prevVal) => ({ ...prevVal, mobileno: value }));
    };

    const setNumberOfQuestions = (e) => {
        const value = e.target.value;
        setNumQuestions(Number(value));
        setUserDetails((prevVal) => ({ ...prevVal, numQuestions: value }));
    };

    useEffect(() => {
        const handleReload = () => {
          setIsReload(true);
        };
        window.addEventListener('beforeunload', handleReload);
        return () => {
          window.removeEventListener('beforeunload', handleReload);
        };
    }, []);

    if (isReload) {
        window.location.href = '/';
    }

    return (
        <>
            <div className='min-h-screen flex flex-col bg-gradient-to-r from-green-500 via-teal-500 to-blue-600'>
                <header className="w-full flex items-start p-3">
                    <Link to={'/'}>
                        <img className='h-10 w-10' src='./logo.png' alt="Logo" />
                    </Link>
                </header>
                
                <main className='flex-grow flex items-center justify-center py-12'>
                    <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-10'>
                        <h1 className='text-2xl font-bold mb-6 text-center'>Welcome to the Quiz! Fill in the Details</h1>
                        <div className='grid gap-4'>
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name:</label>
                                <input
                                    id='name'
                                    type='text'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                    value={name}
                                    onChange={nameField}
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email:</label>
                                <input
                                    id='email'
                                    type='email'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                    value={email}
                                    onChange={emailField}
                                />
                            </div>
                            <div>
                                <label htmlFor='mobileno' className='block text-sm font-medium text-gray-700'>Phone no:</label>
                                <input
                                    id='mobileno'
                                    type='number'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                    value={mobileno}
                                    onChange={phoneNumber}
                                />
                            </div>
                            <div>
                                <label htmlFor='numQuestions' className='block text-sm font-medium text-gray-700'>Number of Questions:</label>
                                <select
                                    id='numQuestions'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                                    value={numQuestions}
                                    onChange={setNumberOfQuestions}
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

                <ToastContainer />
            </div>
        </>
    );
};

export default Form;
