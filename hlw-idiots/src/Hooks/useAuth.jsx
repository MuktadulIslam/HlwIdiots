import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const myAuth = useContext(AuthContext);
    return myAuth;
};

export default useAuth;