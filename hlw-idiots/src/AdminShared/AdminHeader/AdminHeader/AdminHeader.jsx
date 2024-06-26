import toast from 'react-hot-toast';
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import useGoBack from '../../../Hooks/useGoBack';

const AdminHeader = () => {
    const { user, logOut } = useAuth();
    const { goback } = useGoBack();
    const navigation = useNavigate();
    const location = useLocation();

    const logOutHandler = () => {
        logOut()
            .then(() => {
                toast.success("logout successfull");
                navigation('/678170a9caf9f7e3/auth/login', { replace: true });
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <div className="flex justify-between items-center py-3">
            {/* hamburger menu icon */}
            {/* <div onClick={() => setMenuToggle(!menuToggle)} className="flex items-center gap-2 bg-white cursor-pointer lg:hidden">
                {
                    menuToggle ?
                        <IoClose className="w-6 h-6" /> :
                        <FiMenu className="w-6 h-6" />
                }
                Menu
            </div> */}
            <div className="flex items-center gap-2 bg-white">
                <Link to={"/678170a9caf9f7e3/home"}>
                    <button className="w-8 h-8 flex justify-center items-center border-2 border-slate-950 rounded-full">
                        <FaHome />
                    </button>
                </Link>

                {
                    location.pathname === "/678170a9caf9f7e3/home" || <button onClick={goback} className="w-8 h-8 flex justify-center items-center border-2 border-slate-950 rounded-full">
                        <FaArrowLeft />
                    </button>
                }
            </div>

            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={user?.photoURL} alt="" />
                </div>

                <button onClick={logOutHandler} className="font-semibold border-2 border-slate-950 px-3 rounded-lg">Logout</button>
            </div>
        </div>
    );
};

export default AdminHeader;