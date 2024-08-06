import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Component/Quiz';
import { useEffect, useState } from 'react';
import { data } from './Component/Data';
import { addnewquestion } from './Component/Slices/Newarrayslice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Component/Admin';
import AdminDashboard from './Component/AdminDashbord';
import AddQuestion from './Component/AddQuestion';

function App() {
  const [newquesdata, setnewquesdata] = useState([]);
  const [userid,setid] = useState('');
  const [username,setusername] = useState({})
  const dispatch = useDispatch();


  useEffect(()=>{
    
  })

  const newarryafunction = (start, end) => {
    const slicedData = data.slice(start, end);
    setnewquesdata(slicedData);
  }
  
  const id = (id) => {
    setid(id)
  }

  const usern = (username) => {
    setusername(username)
  }
  

  useEffect(() => {
    if (newquesdata.length > 0) {
      dispatch(addnewquestion(newquesdata));
    }
  }, [newquesdata, dispatch]);


  return (
    <>
      <Router>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Form newarryafunction={newarryafunction}  onid={id} username={usern}/>} />
          <Route path='/quiz' element={<Quiz userid={userid} nuser={username}/>} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>} />
          <Route path='/addquestion' element={<AddQuestion/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
