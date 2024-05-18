import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import useSuperAdmin from '../Components/useSuperAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';
import useAdmin from '../Components/useAdmin';

const PrivateAdmin = ({ children }) => {
    // super admin===private admin
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if (loading || adminLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;