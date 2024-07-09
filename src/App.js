import logo from './logo.svg';
import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Component/Quiz';
import { useEffect, useState } from 'react';
import { data } from './Component/Data';
import { addnewquestion } from './Component/Slices/Newarrayslice';
import { useDispatch } from 'react-redux';

function App() {
  const [newquesdata, setnewquesdata] = useState([]);
  const dispatch = useDispatch();


  const newarryafunction = (start, end) => {
    const slicedData = data.slice(start, end);
    setnewquesdata(slicedData);
  }
  console.log(newquesdata)

  useEffect(() => {
    if (newquesdata.length > 0) {
      dispatch(addnewquestion(newquesdata));
    }
  }, [newquesdata, dispatch]);


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Form newarryafunction={newarryafunction} />} />
          <Route path='/quiz' element={<Quiz/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
