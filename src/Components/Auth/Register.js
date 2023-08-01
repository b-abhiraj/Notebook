import React, { useState } from 'react'
import Layout from '../LAyout/Layout'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handlesubmit = async (ev) => {
        ev.preventDefault();
        console.log("hello")
        try {
            const response = await axios.post('/user/createUser', { name, email, password });
            if (response.data) {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Layout>
            <div>
                <div className='card border border-gray-600 w-screen bg-background pt-20 h-100 pb-48  dark:bg-slate-900 '>
                    <div className='flex flex-col items-center justify-center pt-10'>
                        <div className=' border-8 border-shadow shadow-lg rounded-lg  shadow-black w-72'>
                            <div className='text-center bg-white'>
                                <h1 className='text-3xl p-3 font-semibold font-ibm dark:bg-dark-background dark:text-white'>Register</h1>
                            </div>
                            <form className='flex flex-col' onSubmit={handlesubmit}>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    className='fields focus:outline-none focus:shadow-outline'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className='fields focus:outline-none focus:shadow-outline'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='fields focus:outline-none focus:shadow-outline'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className=' p-2 bg-white flex text-gray-400 text-sm dark:bg-dark-background'>
                                    <h2 className='text-gray-'>
                                        Already a member?
                                    </h2>
                                    <Link to={'/login'} className='underline hover:no-underline decoration-gray-400 '> Login</Link>
                                </div>
                                <div className='text-center bg-white p-3 dark:bg-dark-background'>
                                    <button className='bg-accent-blue rounded-md w-36 h-9 font-bold font-ibm' >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register