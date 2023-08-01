import { Book, UserCircle2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import { toast } from 'react-hot-toast'

const Navbar = () => {
    const [authToken] = useAuth();
    const results = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleLogout = () => {
        if (results) {
            localStorage.removeItem("authToken")
            localStorage.removeItem("user");
            toast.success('Logged out successfully');
            navigate('/login');
        }
    }
    return (
        <div >
            <div className='flex dark:bg-blue-950 dark:text-white'>
                <button className='p-3 pl-8 flex' onClick={() => navigate("/")}>
                    <Book />
                    <h1 className="font-bold ">Navbar</h1>
                </button>
                <div className='ms-auto p-3 pr-8 flex'>
                    <div className='pr-2 flex'>
                        <h4 className='text-sm pt-0.5 pr-1'>
                            Hello
                        </h4>
                        <h4 className='font-bold'>
                            {!results ? ('Stranger') : (results)}
                        </h4>
                    </div>
                    <div className=' hover:text-blue-400 group'>
                        <UserCircle2 size={24} />
                        <ul className='hidden absolute right-5 group-hover:flex bg-white flex-col gap-5 rounded-md shadow-md p-5'>
                            <button>New</button>
                            {
                                authToken.authToken ? (<button onClick={handleLogout}>Logout</button>) : (<button onClick={(ev) => navigate('/login')}>Login</button>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar
