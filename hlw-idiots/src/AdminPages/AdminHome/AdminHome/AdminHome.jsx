import { Link } from "react-router-dom";
import iconOne from "../../../assets/images/dashboardWidget/home.png";
import iconTwo from "../../../assets/images/dashboardWidget/question-mark.png";
import iconThree from "../../../assets/images/dashboardWidget/exam.png";
import iconFour from "../../../assets/images/dashboardWidget/group.png";
import iconFive from "../../../assets/images/dashboardWidget/desk.png";
import iconSix from "../../../assets/images/dashboardWidget/college.png";
import iconSeven from "../../../assets/images/dashboardWidget/blackboard.png";
import iconEight from "../../../assets/images/dashboardWidget/school.png";
import iconNine from "../../../assets/images/dashboardWidget/book.png";
import iconTen from "../../../assets/images/dashboardWidget/calendar.png";
import iconEleven from "../../../assets/images/dashboardWidget/image-gallery.png";

// menu items array
const menuItems = [
    {
        icon: iconOne,
        title: "Dashboard",
        destination: "/678170a9caf9f7e3/dashboard"
    },
    {
        icon: iconTwo,
        title: "Question Bank",
        destination: "/678170a9caf9f7e3/question-bank"
    },
    {
        icon: iconThree,
        title: "Exams",
        destination: "/678170a9caf9f7e3/exams"
    },
    {
        icon: iconSeven,
        title: "Board Tags",
        destination: "/678170a9caf9f7e3/tags/boards"
    },
    {
        icon: iconEight,
        title: "College Tags",
        destination: "/678170a9caf9f7e3/tags/colleges"
    },
    {
        icon: iconTen,
        title: "College Exam Tags",
        destination: "/678170a9caf9f7e3/tags/exams"
    },
    {
        icon: iconNine,
        title: "Book Tags",
        destination: "/678170a9caf9f7e3/tags/books"
    },
    {
        icon: iconTen,
        title: "Year Tags",
        destination: "/678170a9caf9f7e3/tags/years"
    },
    {
        icon: iconEleven,
        title: "Gallery",
        destination: "/678170a9caf9f7e3/gallery"
    },
    {
        icon: iconFour,
        title: "Users",
        destination: "/678170a9caf9f7e3/users"
    },
    {
        icon: iconFive,
        title: "Board Exams",
        destination: "/678170a9caf9f7e3/boards"
    },
    {
        icon: iconSix,
        title: "College Exams",
        destination: "/678170a9caf9f7e3/colleges"
    }
];

const AdminHome = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {
                menuItems.map((item, index) => <Link to={item.destination} key={index} className="admin-widget">
                    <div className="flex justify-center items-center mb-2">
                        <img src={item.icon} alt="" width={"50"} />
                    </div>
                    {item.title}
                </Link>)
            }
        </div>
    );
};

export default AdminHome;