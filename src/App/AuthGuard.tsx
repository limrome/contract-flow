import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ user }) => {
    return !user ? <Outlet /> : <Navigate to="/" />;
};

export { AuthGuard };