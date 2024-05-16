import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import useClubAdmin from '../Components/useClubAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';

const PrivateClubAdmin = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isClubAdmin, clubAdminLoading] = useClubAdmin(user?.email)
    const location = useLocation()
    if (loading || clubAdminLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isClubAdmin) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateClubAdmin;