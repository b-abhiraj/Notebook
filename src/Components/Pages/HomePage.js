import React, { useEffect, useState } from 'react'
import Layout from '../LAyout/Layout.js'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal } from 'antd';
import { MoreVertical } from 'lucide-react';

const Homepage = () => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [noteData, setNoteData] = useState([]);
    const authToken = JSON.parse(localStorage.getItem("authToken"));

    axios.defaults.headers.common['auth-token'] = authToken?.authToken;
    const getAllNotes = async () => {
        try {
            const { data } = await axios.get('/note/userNotes')
            toast.success('Fetch successfull')
            setNoteData(data);
        } catch (error) {
            toast.error('Network Error occured')
        }
    }

    const handleSubmit = async () => {
        const res = await axios.post('/note/createNote', {
            title,
            body
        })
        if (res) {
            toast.success('Note Created Successfully')
        }
        else {
            toast.warning('Something went wrong!')
        }
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleSubmit();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect((ev) => {
        getAllNotes();
        //eslint-disable-next-line
    }, [])
    return (
        <Layout>
            <div className='card border  border-gray-600 w-screen bg-background pt-20 h-100% pb-48 dark:bg-slate-900'>
                {!noteData.title ? (
                    <div>
                        <div className='flex  d-flex flex-wrap '>
                            {noteData?.map(p => (
                                <div key={p._id}>
                                    <div className=' card p-3 m-2 border-2 rounded-lg border-black  '>
                                        <div className=' relative'>
                                            <h1 className='text-xl font-bold mr-5'>{p.title}</h1>
                                            <div className='flex mr-5'>
                                                <p>{p.body}</p>
                                                <div className='right-0 ml-5 group absolute'><MoreVertical />
                                                    <div className='hidden absolute group-hover:flex bg-white flex-col gap-5 rounded-md shadow-md p-3'>
                                                        <ul>
                                                            <li>
                                                                <button className='hover:bg-blue-800 hover:text-white p-2 rounded-md' onClick={() => this === 'update'}>  Update
                                                                </button>
                                                                <Modal title="Update a Note" open={this === 'update'} onOk={() => {
                                                                    try {
                                                                        const res = axios.post(`/note/updateNote/${p._id}`, {
                                                                            title,
                                                                            body
                                                                        })
                                                                        if (res) {
                                                                            toast.success('Note Created Successfully')
                                                                        }
                                                                        else {
                                                                            toast.warning('Something went wrong!')
                                                                        }
                                                                        setIsModalOpen(false);
                                                                    } catch (error) {
                                                                        toast.error('Error in update')
                                                                    }
                                                                }} onCancel={handleCancel} >
                                                                    <div className='flex flex-col '>
                                                                        <input
                                                                            placeholder='Title'
                                                                            type='text'
                                                                            className='fields focus:outline-none focus:shadow-outline'
                                                                            value={p.title}
                                                                            onChange={(p) => setTitle(p.target.value)} />
                                                                        <input
                                                                            type='text'
                                                                            className='fields focus:outline-none focus:shadow-outline'
                                                                            placeholder='Note'
                                                                            value={p.body}
                                                                            onChange={(p) => setBody(p.target.value)} />
                                                                    </div>
                                                                </Modal>
                                                            </li>
                                                            <li>
                                                                <button className='hover:bg-red-800 hover:text-white p-2 rounded-md ' onClick={() => {
                                                                    let answer = window.prompt('Are You sure you want to delete the product?')
                                                                    if (answer) {
                                                                        try {
                                                                            const res = axios.delete(`/note/deleteNote/${p._id}`);
                                                                            if (res) {
                                                                                toast.success('Note Delete Success')
                                                                                window.location.reload();
                                                                            }
                                                                        } catch (error) {
                                                                            toast.error('Error in delete')
                                                                            console.log(error)
                                                                        }
                                                                    }
                                                                }}>
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (<div className='flex flex-col items-center justify-center '>
                    :(
                    <div className='flex items-center'>Get started by clicking on the <h1 className='text-2xl'> (+) </h1> icon</div>
                </div>)
                }<Modal id='createModal' title="Create a Note" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                    <div className='flex flex-col'>
                        <input
                            placeholder='Title'
                            type='text'
                            className='fields focus:outline-none focus:shadow-outline'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <input
                            type='text'
                            className='fields focus:outline-none focus:shadow-outline'
                            placeholder='Note'
                            value={body}
                            onChange={(e) => setBody(e.target.value)} />
                    </div>
                </Modal>
                <div className='flex '>
                    <div className='ms-auto absolute p-3 pr-5 float-right  right-0 bottom-0 text-5xl font-bold'>
                        <div className='border-8 rounded-full p-2 bg-green-400 text-white border-green-500'>
                            <button className='' type='primary' onClick={showModal} id='createModal'>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Homepage