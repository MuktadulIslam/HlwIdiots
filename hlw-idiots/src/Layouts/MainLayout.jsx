import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="max-w-[768px] relative mx-3 lg:mx-auto mt-14">
            <Toaster />
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;