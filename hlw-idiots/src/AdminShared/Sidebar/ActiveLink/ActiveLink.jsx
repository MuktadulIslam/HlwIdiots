import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-lg text-[#FFA800] border-b border-[#FFA800] py-1"
                    : "text-lg py-1"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;