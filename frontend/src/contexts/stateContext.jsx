import { createContext } from "react";

 const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
})

export default stateContext;