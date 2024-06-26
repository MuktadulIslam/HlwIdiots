import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import AdminHeader from "../AdminShared/AdminHeader/AdminHeader/AdminHeader";

const AdminLayout = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const location = useLocation();

    // menu is not visible in these location
    const menuRestrictedLocation = ["/678170a9caf9f7e3/auth/login"];

    // check restricted location
    const isRestricted = menuRestrictedLocation.find(item => item === location.pathname);

    return (
        <div className={`grid ${isRestricted ? '' : 'lg:grid-cols-12'}`}>
            <Toaster />

            {/* {
                isRestricted ? '' : <Sidebar
                    menuToggle={menuToggle}
                    setMenuToggle={setMenuToggle}
                />
            } */}

            <div className="lg:col-span-10 lg:col-start-2 px-5 lg:px-8">
                {
                    isRestricted ? '' : <AdminHeader
                        menuToggle={menuToggle}
                        setMenuToggle={setMenuToggle}
                    />
                }

                <div className="py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;