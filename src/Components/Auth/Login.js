import React, { useState } from 'react'
import Layout from '../LAyout/Layout.js'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handlesubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post('/user/loginUser', { email, password });
            if (res.data) {
                localStorage.setItem("authToken", JSON.stringify(res?.data));
                console.log(res?.data)
                axios.defaults.headers.common['auth-token'] = res?.data?.authToken;
                const { data } = await axios.post('/user/getUser');
                localStorage.setItem("user", data.name)
                navigate('/');
                toast.success('Logged in successfully')
            } else {
                toast.error('Something Went Wrong')
            }
        } catch (err) {
            toast.error(err)
        }
    }
    return (
        <Layout>

            <div>
                <div className='card border border-gray-600 w-screen bg-background pt-20 h-100 pb-48 dark:bg-slate-900 '>
                    <div className='flex flex-col items-center justify-center  pt-10'>
                        <div className=' border-8 border-shadow shadow-lg rounded-lg  shadow-black w-72 '>
                            <div className='text-center bg-white dark:bg-dark-background dark:text-white'>
                                <h1 className='text-3xl p-3 font-semibold font-ibm'>Login</h1>
                            </div>
                            <form className='flex flex-col ' >
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className='fields focus:outline-none focus:shadow-outline '
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
                                <div className=' p-2 bg-white flex text-gray-400 text-sm dark:bg-dark-background '>
                                    <h2 className='text-gray-'>
                                        Not a member Yet?
                                    </h2>
                                    <Link to={'/register'} className='underline hover:no-underline decoration-gray-400 '> Regsiter</Link>
                                </div>
                                <div className='text-center bg-white p-3 dark:bg-dark-background dark:text-white'>
                                    <button className='bg-accent-blue rounded-md w-36 h-9 font-bold font-ibm' onClick={handlesubmit} >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login