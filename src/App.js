import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Component/Quiz';
import { useEffect, useState } from 'react';
import { addnewquestion } from './Component/Slices/Newarrayslice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Component/Admin';
import AdminDashboard from './Component/AdminDashbord';

function App() {
  const [newquesdata, setnewquesdata] = useState([]);
  const [userid, setid] = useState('');
  const [username, setusername] = useState({});
  const [data, setData] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newquesdata.length > 0) {
      dispatch(addnewquestion(newquesdata));
    }
  }, [newquesdata, dispatch]);

  const newarryafunction = (start, end) => {
    if (typeof start === 'number' && typeof end === 'number' && start >= 0 && end <= data.length && start < end) {
      const slicedData = data.slice(start, end);
      setnewquesdata(slicedData);
    } else {
      console.warn("Invalid start or end values for slicing data:");
    }
  };

  const id = (id) => {
    setid(id);
  };

  const usern = (username) => {
    setusername(username);
  };

  const handleQuestionsUpdate = (questions) => {
    setData(questions);
  };

  // Callback function to update selected questions
  const handleSelectedQuestions = (questions) => {
    setSelectedQuestions(questions);
  };

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Form newarryafunction={newarryafunction}  onid={id} username={usern}/>} />
          <Route path='/quiz' element={<Quiz userid={userid} nuser={username}/>} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
