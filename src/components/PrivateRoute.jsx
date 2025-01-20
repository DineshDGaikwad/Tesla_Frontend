import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component that checks for authentication
const PrivateRoute = ({ element }) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // If there's no authToken, redirect to login
        return <Navigate to="/login" />;
    }

    return element; // Return the element if the user is authenticated
};

export default PrivateRoute;
