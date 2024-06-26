import Logo from "../../../assets/images/logo/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import ActiveLink from "../ActiveLink/ActiveLink";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useUserData from "../../../Hooks/useUserData";

const Header = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [userData] = useUserData();
    const { user, logOut } = useAuth();
    const location = useLocation();

    // menu is not visible in these location
    const menuRestrictedLocation = [
        "/take-a-tour",
        "/auth/login",
        "/auth/register",
        "/colleges/:collegeName/:subjectName/:examName/pdf",
        "/boards/:boardName/:subjectName/:year/pdf",
    ];

    // check restricted location
    // const isRestricted = menuRestrictedLocation.find(item => item === location.pathname);
    const isRestricted = menuRestrictedLocation.some((item) => {
        // Replace dynamic parts of the route with a wildcard pattern
        const pattern = item.replace(/:[^/]+/g, "[^/]+");
        const regex = new RegExp(`^${pattern}$`);

        // Test if the current pathname matches the pattern
        return regex.test(location.pathname);
    });

    // menu items array
    const menuItems = [
        {
            title: "হোম",
            destination: "/",
        },
        {
            title: "কলেজ প্রশ্ন",
            destination: "/colleges",
        },
        {
            title: "বোর্ড প্রশ্ন",
            destination: "/boards",
        },
        {
            title: "One Shot Revision",
            destination: "/one-shot-revision",
        },
        {
            title: "Hot Questions",
            destination: "/hot-questions",
        },
        {
            title: "Most Failed Questions",
            destination: "/most-failed-questions",
        },
        {
            title: "Profile",
            destination: "/profile",
        },
    ];

    const logOutHandler = () => {
        logOut()
            .then(() => toast.success("logout successfull"))
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="mb-4">
            {/* hamburger menu icon */}
            {isRestricted ? (
                ""
            ) : (
                <div className="max-w-[768px] w-full fixed top-0 left-0 md:left-1/2 md:-translate-x-1/2 px-3 md:px-0 py-3 flex justify-between items-center gap-2 bg-white mb-4 cursor-pointer">
                    <div
                        onClick={() => setMenuToggle(!menuToggle)}
                        className="flex items-center gap-2"
                    >
                        {menuToggle ? (
                            <IoClose className="w-6 h-6" />
                        ) : (
                            <FiMenu className="w-6 h-6" />
                        )}
                        Menu
                    </div>

                    <div className="flex items-center gap-2">
                        {user && (
                            <img
                                src={userData.profileImg}
                                className="w-8 h-8 rounded-full"
                            />
                        )}

                        {user && (
                            <button
                                className="text-sm px-3 py-1 bg-[#F44336] text-white rounded-md"
                                onClick={logOutHandler}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* logo header */}
            <div className="bg-gradient-to-r from-[#FFA80019] to-[#9900005E] py-3 rounded-[50px]">
                <img src={Logo} alt="Logo" className="w-[140px] mx-auto" />
            </div>

            {/* sidebar menu */}
            {isRestricted ? (
                ""
            ) : (
                <div
                    className={`w-[280px] md:w-[350px] h-full fixed top-0 ${
                        menuToggle ? "left-0" : "-left-[350px]"
                    } bg-[#1C1C1C] pt-10 px-6 pb-8 transition-all duration-300 z-10`}
                >
                    <div
                        onClick={() => setMenuToggle(!menuToggle)}
                        className="absolute top-0 right-0 bg-[#FFA800] p-1 cursor-pointer"
                    >
                        <IoClose className="w-6 h-6" />
                    </div>

                    <ul>
                        {menuItems.map((menuItem, index) => (
                            <li
                                onClick={() => setMenuToggle(!menuToggle)}
                                key={index}
                                className="grid mb-2"
                            >
                                <ActiveLink to={menuItem.destination}>
                                    {menuItem.title}
                                </ActiveLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
