import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivatePersonalRoute = ({ user }) => {
    return user ? <Outlet /> : <Navigate to="/sign_in" />;
};

export { PrivatePersonalRoute };