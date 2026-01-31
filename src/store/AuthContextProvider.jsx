import { createContext, useEffect, useState } from "react"
import axiosInstance from "../apis/axiosInstance";

export const AuthContext = createContext({
    user: null,
    isAuth: false,
    isLoading: true,
    setIsAuthenticated:()=>{},
    setUser: ()=>{},
    checkAuth: ()=>{}
})

const AuthContextProvider = ({children}) => {
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{

        const checkAuth = async()=>{
            try{
                const response = await axiosInstance.get('/auth/check');
                if(response.data.isAuthenticated){
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                }else{
                    setIsAuthenticated(false);
                    setUser(null);
                }   
            }catch(error){
                setIsAuthenticated(false);
                setUser(null);
            }finally{
                setTimeout(() => setIsLoading(false), 500); 
            }
        }
        checkAuth();
    },[]);

    const contextValue = {
        user:user,
        isAuth: isAuthenticated,
        isLoading: isLoading,
        setIsAuthenticated: setIsAuthenticated,
        setUser: setUser
    }



    return <AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>
}
export default AuthContextProvider;