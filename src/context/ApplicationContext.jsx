import { createContext, useState } from "react";

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({children})=>{
     const [loading, setLoading] = useState(false);
     const [message, setMessage] = useState({ type: '', text: '' });
     const [error, setError] = useState('');
    return(
       <ApplicationContext.Provider value={{ loading, setLoading, message, setMessage,error, setError }}>
         {children}
       </ApplicationContext.Provider> 
    )
}

export default ApplicationContextProvider;