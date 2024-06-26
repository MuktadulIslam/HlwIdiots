import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useUserData from '../Hooks/useUserData';
import Spinner from '../Components/Spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [userData, isLoading] = useUserData();
    const location = useLocation();
    const destination = "/auth/register";

    if (loading) {
        return <Spinner />;
    }

    if (isLoading && location.pathname !== '/auth/register') {
        return <Spinner />;
    }

    if (!userData?.phone && location.pathname !== '/auth/register') {
        return <Navigate to={destination} replace="true"></Navigate>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/take-a-tour" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;