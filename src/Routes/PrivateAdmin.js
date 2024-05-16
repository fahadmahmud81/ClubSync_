import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import useSuperAdmin from '../Components/useSuperAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';

const PrivateAdmin = ({ children }) => {
    // super admin===private admin
    const { user, loading } = useContext(AuthContext)
    const [isSuperAdmin, superAdminLoading] = useSuperAdmin(user?.email)
    const location = useLocation()
    if (loading || superAdminLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isSuperAdmin) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;