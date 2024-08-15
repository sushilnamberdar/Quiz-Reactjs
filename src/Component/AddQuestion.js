import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from './uri';
import { useNavigate } from 'react-router-dom';
const AddQuestion = () => {
  const navigate = useNavigate(); 
 
  const [questionData, setQuestionData] = useState({
    Questions: '',
    A: '',
    B: '',
    C: '',
    D: '',
    Ans: '',
    TOPIC: '',
  });
  useEffect(()=>{
    let atoken = localStorage.getItem('atoken');
    if(atoken === null || atoken === undefined){
      navigate('/admin')
    }
  })
  const [jsonFile, setJsonFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleAddQuestion = async () => {
    if (Object.values(questionData).every(field => field.trim())) {
      try {
        const response = await axios.post(`${url}/addquestion`, questionData);
        setResponse('Question added successfully!');
      } catch (error) {
        console.error('Error sending question to backend:', error);
        setResponse('Failed to add question.');
      }
      setQuestionData({
        Questions: '',
        A: '',
        B: '',
        C: '',
        D: '',
        Ans: '',
        TOPIC: '',
      });
    } else {
      console.log('Please fill in all fields.');
      setResponse('Please fill in all fields.');
    }
  };

  const handleJsonUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = JSON.parse(e.target.result);
          setJsonFile(jsonContent);
          console.log("JSON file loaded successfully:", jsonContent);
        } catch (error) {
          console.error('Invalid JSON file:', error);
          setResponse('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };
  
  const handleJsonSubmit = async () => {
    if (jsonFile) {
      try {
        const response = await axios.post(`${url}/uploadjson`, jsonFile, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Response from server:", response);
        setResponse('JSON file data sent successfully!');
      } catch (error) {
        console.error('Error sending JSON file data to backend:', error.response?.data || error.message);
        setResponse('Failed to send JSON file data.');
      }
    } else {
      console.log('Please upload a JSON file.');
      setResponse('Please upload a JSON file.');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add Question</h2>
        <input
          type="text"
          name="Questions"
          value={questionData.Questions}
          onChange={handleInputChange}
          placeholder="Enter the question"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="A"
          value={questionData.A}
          onChange={handleInputChange}
          placeholder="Option A"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="B"
          value={questionData.B}
          onChange={handleInputChange}
          placeholder="Option B"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="C"
          value={questionData.C}
          onChange={handleInputChange}
          placeholder="Option C"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="D"
          value={questionData.D}
          onChange={handleInputChange}
          placeholder="Option D"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="Ans"
          value={questionData.Ans}
          onChange={handleInputChange}
          placeholder="Correct Answer Enter only Option (A || B || C || D)"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          name="TOPIC"
          value={questionData.TOPIC}
          onChange={handleInputChange}
          placeholder="Topic"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleAddQuestion}
          className="mt-3 bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 transition duration-200"
        >
          Add Question
        </button>
      </div>

      <div className="text-center">
        <span className="text-gray-500">or</span>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload JSON File</h2>
        <input
          type="file"
          accept=".json"
          onChange={handleJsonUpload}
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        />
        <button
          onClick={handleJsonSubmit}
          className="mt-3 bg-green-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-green-700 transition duration-200"
        >
          Upload JSON
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Response</h2>
        <p className={`text-${response.includes('successfully') ? 'green' : 'red'}-500`}>
          {response}
        </p>
      </div>
    </div>
  );
};

export default AddQuestion;
