import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.rol_id)) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PrivateRoute;
