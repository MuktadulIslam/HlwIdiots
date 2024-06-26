import useAuth from '../Hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import toast from 'react-hot-toast';
import Spinner from '../Components/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const [isAdmin, isLoading] = useAdmin();
    const navigation = useNavigate();

    if (loading || isLoading) {
        return <Spinner />;
    }

    if (user && isAdmin.isAdmin === true) {
        return children;
    } else {
        if (user) {
            logOut()
                .then(() => {
                    toast.success("logout successfull");
                    navigation('/678170a9caf9f7e3/auth/login', { replace: true });
                })
                .catch(err => toast.error(err.message))
        } else {
            return <Navigate to={"/forbidden"} replace />
        }
    }
};

export default AdminRoute;