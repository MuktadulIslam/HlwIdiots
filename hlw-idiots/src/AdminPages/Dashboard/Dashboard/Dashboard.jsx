import { Link } from "react-router-dom";

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

const Dashboard = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5">
            {
                menuItems.map((item, index) => <Link to={item.destination} key={index} className="bg-slate-200 text-lg font-semibold text-center px-3 py-6 rounded-xl">
                    {item.title}
                </Link>)
            }
        </div>
    );
};

export default Dashboard;