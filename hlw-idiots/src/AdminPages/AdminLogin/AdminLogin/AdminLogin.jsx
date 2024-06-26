import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation } from 'react-router-dom';

const AdminLogin = () => {
    const { user, logInWithGoogle } = useAuth();
    const location = useLocation();
    const destination = location.state?.form || "/678170a9caf9f7e3/home";

    if (user) {
        return <Navigate to={destination} replace="true"></Navigate>;
    }

    const googleLoginHandler = () => {
        logInWithGoogle()
            .then(() => toast.success("login successfull"))
            .catch(err => toast.error(err.message))
    }

    return (
        <>
            <Helmet>
                <title>Hlw Idiots | Login</title>
            </Helmet>

            <div className="h-[550px] flex justify-center items-center">
                <button onClick={googleLoginHandler} className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-lg">
                    <FaGoogle className="w-10 h-10" />
                    <p className="text-center">Login with Google</p>
                </button>
            </div>
        </>
    );
};

export default AdminLogin;