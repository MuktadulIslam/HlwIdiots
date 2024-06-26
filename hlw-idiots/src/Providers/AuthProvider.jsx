import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import myApp from "../Config/Firebase/Firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(myApp);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiRestriction, setApiRestriction] = useState(true);

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                axios
                    .post(`${import.meta.env.VITE_SERVER_BASE_URL}/jwt`, {
                        email: currentUser.email,
                    })
                    .then((data) => {
                        localStorage.setItem("access-token", data.data.token);
                    });

                setApiRestriction(false);
            } else {
                localStorage.removeItem("access-token");
                setApiRestriction(true);
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        apiRestriction,
        logInWithGoogle,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
