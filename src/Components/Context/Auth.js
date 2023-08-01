import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        authToken: ""
    });

    axios.defaults.headers.common['auth-token'] = auth?.authToken;

    useEffect(() => {
        const data = localStorage.getItem("authToken")
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                authToken: parseData.authToken
            });
        }
        //eslint-disable-next-line
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }