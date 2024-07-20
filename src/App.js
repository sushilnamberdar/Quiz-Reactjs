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

function App() {
  const [newquesdata, setnewquesdata] = useState([]);
  const [userid,setid] = useState('');
  const dispatch = useDispatch();


  const newarryafunction = (start, end) => {
    const slicedData = data.slice(start, end);
    setnewquesdata(slicedData);
  }
  
  const id = (id) => {
    setid(id)
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
          <Route path='/' element={<Form newarryafunction={newarryafunction}  onid={id}/>} />
          <Route path='/quiz' element={<Quiz userid={userid}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
