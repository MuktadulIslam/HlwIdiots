import { IoClose } from "react-icons/io5";
import Logo from "../../../assets/images/logo/logo.png";
import ActiveLink from "../ActiveLink/ActiveLink";

// menu items array
const menuItems = [
    {
        title: "Dashboard",
        destination: "/678170a9caf9f7e3/dashboard"
    },
    {
        title: "Add Question",
        destination: "/678170a9caf9f7e3/add-question"
    },
    {
        title: "Users",
        destination: "/678170a9caf9f7e3/users"
    },
    {
        title: "বোর্ড প্রশ্ন",
        destination: "/boards"
    }
];

const Sidebar = ({ menuToggle, setMenuToggle }) => {
    return (
        <div className={`w-[280px] lg:w-full h-full fixed lg:relative top-0 p-5 ${menuToggle ? 'left-0' : '-left-[350px]'} lg:left-0 lg:col-span-2 bg-white transition-all duration-300 z-10`}>
            {/* logo header */}
            <div className="bg-gradient-to-r from-[#FFA80019] to-[#9900005E] py-3 rounded-[50px]">
                <img src={Logo} alt="Logo" className="w-[140px] mx-auto" />
            </div>

            {/* sidebar menu */}
            <div>
                <div onClick={() => setMenuToggle(!menuToggle)} className="lg:hidden absolute top-0 right-0 bg-[#FFA800] p-1 cursor-pointer">
                    <IoClose className="w-6 h-6" />
                </div>

                <ul>
                    {
                        menuItems.map((menuItem, index) => <li onClick={() => setMenuToggle(!menuToggle)} key={index} className="grid mb-2" >
                            <ActiveLink to={menuItem.destination}>{menuItem.title}</ActiveLink>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;