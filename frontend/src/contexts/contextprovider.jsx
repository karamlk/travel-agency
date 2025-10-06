import { useEffect,useState } from "react";
import stateContext from "./stateContext";

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({ });
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token)

        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    
    useEffect(() => {
        const storedToken = localStorage.getItem('ACCESS_TOKEN');
        if (storedToken) {
            _setToken(storedToken);
        }
    }, []);

    return (
        <stateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </stateContext.Provider>
    )
};
