import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContextProvider'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {isAuth, isLoading,user} = useContext(AuthContext);
  console.log("Protected Route Check - isAuth:", isAuth, "isLoading:", isLoading);
 
  if (isLoading) return <div>Checking authentication...</div>;

   if (!isAuth) return <Navigate to="/auth/login" replace />;

  

  return children;
}

export default ProtectedRoute
