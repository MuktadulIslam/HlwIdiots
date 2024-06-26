import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-lg text-[#FFA800] border-b border-[#FFA800] py-1"
                    : "text-lg text-[#F5F5F5] hover:text-white border-b border-[#F5F5F5] py-1"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;