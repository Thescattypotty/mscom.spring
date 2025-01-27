import { Navigate } from 'react-router-dom';

import { useAuth } from "src/context/AuthContext";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    console.log("Is Authenticated" , isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace/>;
}