import React, { useContext } from 'react';
import LoadingElement from '../Components/LoadingElement';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../ContextApi/UserContext';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <LoadingElement></LoadingElement>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children
};

export default PrivateRoutes;