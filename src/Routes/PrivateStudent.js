import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import useStudent from '../Components/useStudent';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';

const PrivateStudent = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isStudent, studentLoading] = useStudent(user?.email)
    const location = useLocation()
    if (loading || studentLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isStudent) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateStudent;