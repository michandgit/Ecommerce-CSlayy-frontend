import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContextProvider'
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const ProtectedRoute = ({children}) => {
  const {isAuth, isLoading,user} = useContext(AuthContext);
 
  if (isLoading) return <Loading />;

   if (!isAuth) return <Navigate to="/auth/login" replace />;

  

  return children;
}

export default ProtectedRoute
