import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getCurrentUser().then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
            }else{
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])
    // useEffect(()=>{
    //     console.log('inside globalprovider:', {isLoggedIn,user,isLoading})
    // },[isLoggedIn,user])
    return(
        <GlobalContext.Provider value={{isLoading, user, isLoggedIn, setIsLoading, setIsLoggedIn, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}