import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import Homepage from './Components/Pages/HomePage';
import Register from './Components/Auth/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
export default function App() {
  axios.defaults.baseURL = 'https://gleaming-moccasins-dog.cyclic.app/api/v1';
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}