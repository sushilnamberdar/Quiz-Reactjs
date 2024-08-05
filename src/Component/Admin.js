import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const[username,setusername] = useState('');
    const[password,setpassword] = useState('');
    const navigate = useNavigate();
    const[admindata,setadmindata] = useState({
        username:'',
        password:'',
    })
    const [login,setlogin] = useState(false);

    const usernamefiled=(e) => {
        const value = e.target.value
        setusername(value)
        setadmindata((preval)=> ({...preval ,username:value}))
    }
    const passwordfiled = (e) => {
        const value = e.target.value
        setpassword(value);
        setadmindata((preval) => ({
            ...preval, password:value
        }))
    }

    const handellogin = ()=> {
        
        console.log("username",username,'paswword',password)
        if(!username||!password){
        toast.error("plz fill all the filed")
        }
        setlogin(true);
    }

    useEffect(() => {
      if(login){
      axios.post('http://localhost:4959/admin',admindata).then((Response) => {
        console.log("response from the server ",Response)
        toast.success(Response.data.message);
        const token = Response.data.token;
        localStorage.setItem('atoken',token);
        navigate('/admindashboard')
      }).catch((err)=> {
        console.log('responseerro ', err)
        toast.error(err.message)
      }).finally(()=> {
        setlogin(false);
      })
    }
    },[login]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={usernamefiled}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={passwordfiled}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handellogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
