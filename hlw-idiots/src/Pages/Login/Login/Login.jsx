import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { user, logInWithGoogle } = useAuth();
    const location = useLocation();
    const destination = location.state?.form || "/auth/register";

    if (user) {
        return <Navigate to={destination} replace="true"></Navigate>;
    }

    const googleLoginHandler = () => {
        logInWithGoogle()
            .then((result) => {
                toast.success("Login successful");
                axios
                    .post(`${import.meta.env.VITE_SERVER_BASE_URL}/users`, {
                        name: result.user.displayName,
                        email: result.user.email,
                        status: "Active",
                        joinedDate: new Date(),
                    })
                    .then(() => {});
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <>
            <Helmet>
                <title>Hlw Idiots | Login</title>
            </Helmet>

            <div
                onClick={googleLoginHandler}
                className="h-[400px] flex justify-center items-center"
            >
                <button className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-lg">
                    <FaGoogle className="w-10 h-10" />
                    <p className="text-center">Login with Google</p>
                </button>
            </div>
        </>
    );
};

export default Login;
