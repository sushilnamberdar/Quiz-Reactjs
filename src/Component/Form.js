import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from './Data';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ newarryafunction ,onid }) => {
    
    const [name, setName] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [email, setemail] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const navigate = useNavigate();
    const[startquizbutton,setstartquizbutton]=useState(false);
    const [userdetails,setuserdetails] = useState({
        name:'',
        email:'',
        mobileno:'',
        
    })

    const handleStartQuiz = () => {
        if (!name.trim() || !mobileno.trim() || !email.trim()) {
            toast.error("Please fill out all fields.");
            return;
        }

        if (numQuestions <= 0 || numQuestions > 867) {
            toast.error("Please select a valid number of questions.");
            return;
        }

        const maxStartIndex = data.length - numQuestions;
        const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
        const endIndex = startIndex + numQuestions;
        const slicedData = data.slice(startIndex, endIndex);
        newarryafunction(startIndex, endIndex);
        setstartquizbutton(true);

      
    }


    useEffect(() => {
        
        if(startquizbutton){
            axios.post("http://localhost:4959/userdetails",userdetails).then((Response) => {
                toast.success( Response.data.message+ " " + 'Quiz started successfully!');
                const userid = Response.data.existingUser._id;
               onid(userid)
                
                navigate('/quiz');
            }).catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                  toast.error(error.response.data.message);
                } else {
                  toast.error('An error occurred. Please try again.');
                }
              }).finally(() => {
                setstartquizbutton(false)
            })

            
        }
    },[startquizbutton])

        // function for form datails
        const namefiled = (e) => {
            const value = e.target.value;
        
            setName(e.target.value);
            setuserdetails((prevval)=> ({...prevval , name:value}));
        }

        const emailfiled = (e) => {

            
            const value = e.target.value;
            setemail(e.target.value);
            setuserdetails((prevval) => ({... prevval,email:value}))
        }
        const phonenumber = (e) => {
            const value = e.target.value;
            setMobileno(e.target.value);
            setuserdetails((prevval) => ({...prevval ,mobileno:value}))
        }
        

        const setnumberofquestion = (e) => {
            const value = e.target.value;
            setNumQuestions(Number(value));
            setuserdetails((prevval) => ({...prevval ,numQuestions:value}))
        }

        

    return (
        <div className='flex items-center justify-center min-h-screen py-12 bg-gradient-to-r from-green-500 via-teal-500 to-blue-600' >
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
                            onChange={namefiled}
                        />
                    </div>
                    <div>
                        <label  className='block text-sm font-medium text-gray-700'>Email:</label>
                        <input  type='email' className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            onChange={emailfiled}
                        />
                    </div>
                    <div>
                        <label htmlFor='mobileno' className='block text-sm font-medium text-gray-700'>Phone no:</label>
                        <input
                            id='mobileno'
                            type='number'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={mobileno}
                            onChange={phonenumber}
                        />
                    </div>
                    <div>
                        <label htmlFor='numQuestions' className='block text-sm font-medium text-gray-700'>Number of Questions:</label>
                        <select
                            id='numQuestions'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                            value={numQuestions}
                            onChange={setnumberofquestion}
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
