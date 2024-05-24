import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';
import useAdvisor from '../Components/useAdvisor';

const PrivateAdvisor = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdvisor, advisorLoading] = useAdvisor(user?.email)
    const location = useLocation()
    if (loading || advisorLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isAdvisor) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateAdvisor;