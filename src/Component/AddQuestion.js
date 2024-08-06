import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleAddQuestion = async () => {
    if (question.trim()) {
      const data = { question, source: 'user' };
      try {
        const response = await axios.post('/api/questions', data);
        setResponse('Question added successfully!');
      } catch (error) {
        console.error('Error sending question to backend:', error);
        setResponse('Failed to add question.');
      }
      setQuestion('');
    } else {
      console.log('Please enter a question.');
      setResponse('Please enter a question.');
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
        } catch (error) {
          console.error('Invalid JSON file');
          setResponse('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonSubmit = async () => {
    if (jsonFile) {
      try {
        const response = await axios.post('/api/questions', jsonFile);
        setResponse('JSON file data sent successfully!');
      } catch (error) {
        console.error('Error sending JSON file data to backend:', error);
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="border border-gray-300 rounded-lg p-3 w-full lg:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
