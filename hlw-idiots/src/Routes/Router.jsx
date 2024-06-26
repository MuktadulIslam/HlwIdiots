import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import TakeTour from "../Pages/TakeTour/TakeTour/TakeTour";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Register/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Colleges from "../Pages/Colleges/Colleges/Colleges";
import Boards from "../Pages/Boards/Boards/Boards";
import CollegeSubjects from "../Pages/CollegeSubjects/CollegeSubjects/CollegeSubjects";
import BoardSubjects from "../Pages/BoardSubjects/BoardSubjects/BoardSubjects";
import BoardYears from "../Pages/BoardYears/BoardYears/BoardYears";
import BoardQuestion from "../Pages/BoardQuestion/BoardQuestion/BoardQuestion";
import CollegeExamList from "../Pages/CollegeExamList/CollegeExamList/CollegeExamList";
import CollegeQuestion from "../Pages/CollegeQuestion/CollegeQuestion/CollegeQuestion";
import BoardExam from "../Pages/BoardExam/BoardExam/BoardExam";
import AdminLayout from "../Layouts/AdminLayout";
import AdminLogin from "../AdminPages/AdminLogin/AdminLogin/AdminLogin";
import Dashboard from "../AdminPages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminUsers from "../AdminPages/AdminUsers/AdminUsers/AdminUsers";
import AddQuestion from "../AdminPages/AddQuestion/AddQuestion/AddQuestion";
import AdminHome from "../AdminPages/AdminHome/AdminHome/AdminHome";
import AdminBoardSubjects from "../AdminPages/AdminBoardSubjects/AdminBoardSubjects/AdminBoardSubjects";
import AdminBoardYears from "../AdminPages/AdminBoardYears/AdminBoardYears/AdminBoardYears";
import AdminBoardQuestion from "../AdminPages/AdminBoardQuestion/AdminBoardQuestion/AdminBoardQuestion";
import AdminQuestionBank from "../AdminPages/AdminQuestionBank/AdminQuestionBank/AdminQuestionBank";
import AdminSubjectQuestion from "../AdminPages/AdminSubjectQuestion/AdminSubjectQuestion/AdminSubjectQuestion";
import AdminTags from "../AdminPages/AdminTags/AdminTags/AdminTags";
import QuestionPDF from "../Pages/QuestionPDF/QuestionPDF/QuestionPDF";
import AdminGallery from "../AdminPages/AdminGallery/AdminGallery/AdminGallery";
import TagPage from "../Pages/TagPage/TagPage/TagPage";
import TagQuestions from "../Pages/TagQuestions/TagQuestions/TagQuestions";
import CollegeExam from "../Pages/CollegeExam/CollegeExam/CollegeExam";
import ExamResult from "../Pages/ExamResult/ExamResult/ExamResult";
import LiveExams from "../Pages/LiveExams/LiveExams/LiveExams";
import AdminExams from "../AdminPages/AdminExams/AdminExams/AdminExams";
import AdminExamQuestions from "../AdminPages/AdminExamQuestions/AdminExamQuestions/AdminExamQuestions";
import LiveExam from "../Pages/LiveExam/LiveExam/LiveExam";
import LiveExamResult from "../Pages/LiveExamResult/LiveExamResult/LiveExamResult";
import ExamScoreboard from "../Pages/ExamScoreboard/ExamScoreboard/ExamScoreboard";
import UserProfile from "../Pages/UserProfile/UserProfile/UserProfile";
import AdminBoards from "../AdminPages/AdminBoards/AdminBoards/AdminBoards";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/take-a-tour",
                element: <TakeTour />,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: (
                    <PrivateRoute>
                        <Register />
                    </PrivateRoute>
                ),
            },
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/colleges",
                element: (
                    <PrivateRoute>
                        <Colleges />
                    </PrivateRoute>
                ),
            },
            {
                path: "/colleges/:collegeName",
                element: (
                    <PrivateRoute>
                        <CollegeSubjects />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/tags/${params.collegeName}`
                    ),
            },
            {
                path: "/colleges/:collegeName/:subjectName",
                element: (
                    <PrivateRoute>
                        <CollegeExamList />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/colleges/:collegeName/:subjectName/:examName",
                element: (
                    <PrivateRoute>
                        <CollegeQuestion />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/colleges/:collegeName/:subjectName/:examName/pdf",
                element: (
                    <PrivateRoute>
                        <QuestionPDF />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/colleges/:collegeName/:subjectName/:examName/exam",
                element: (
                    <PrivateRoute>
                        <CollegeExam />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/boards",
                element: (
                    <PrivateRoute>
                        <Boards />
                    </PrivateRoute>
                ),
            },
            {
                path: "/boards/:boardName",
                element: (
                    <PrivateRoute>
                        <BoardSubjects />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/tags/${params.boardName}`
                    ),
            },
            {
                path: "/boards/:boardName/:subjectName",
                element: (
                    <PrivateRoute>
                        <BoardYears />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/boards/:boardName/:subjectName/:year",
                element: (
                    <PrivateRoute>
                        <BoardQuestion />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/boards/:boardName/:subjectName/:year/pdf",
                element: (
                    <PrivateRoute>
                        <QuestionPDF />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/boards/:boardName/:subjectName/:year/exam",
                element: (
                    <PrivateRoute>
                        <BoardExam />
                    </PrivateRoute>
                ),
            },
            {
                path: "/:tag",
                element: (
                    <PrivateRoute>
                        <TagPage />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tags/${params.tag}`),
            },
            {
                path: "/:tag/questions",
                element: (
                    <PrivateRoute>
                        <TagQuestions />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tags/${params.tag}`),
            },
            {
                path: "/live-exams",
                element: (
                    <PrivateRoute>
                        <LiveExams />
                    </PrivateRoute>
                ),
            },
            {
                path: "/exams/live/:slug/exam",
                element: (
                    <PrivateRoute>
                        <LiveExam />
                    </PrivateRoute>
                ),
            },
            {
                path: "/exams/live/:slug/scoreboard",
                element: (
                    <PrivateRoute>
                        <ExamScoreboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/live-exam-result",
                element: (
                    <PrivateRoute>
                        <LiveExamResult />
                    </PrivateRoute>
                ),
            },
            {
                path: "/exam-result",
                element: (
                    <PrivateRoute>
                        <ExamResult />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/678170a9caf9f7e3",
        element: <AdminLayout />,
        children: [
            {
                path: "/678170a9caf9f7e3/auth/login",
                element: <AdminLogin />,
            },
            {
                path: "/678170a9caf9f7e3/home",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/dashboard",
                element: (
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/question-bank",
                element: (
                    <AdminRoute>
                        <AdminQuestionBank />
                    </AdminRoute>
                ),
                loader: () =>
                    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/total-questions`),
            },
            {
                path: "/678170a9caf9f7e3/question-bank/:subjectName/:pageNo",
                element: (
                    <AdminRoute>
                        <AdminSubjectQuestion />
                    </AdminRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/678170a9caf9f7e3/tags/:tagType",
                element: (
                    <AdminRoute>
                        <AdminTags />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/gallery",
                element: (
                    <AdminRoute>
                        <AdminGallery />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/exams",
                element: (
                    <AdminRoute>
                        <AdminExams />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/exams/:slug/:pageNo",
                element: (
                    <AdminRoute>
                        <AdminExamQuestions />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/boards",
                element: (
                    <AdminRoute>
                        <AdminBoards />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/boards/:boardName",
                element: (
                    <AdminRoute>
                        <AdminBoardSubjects />
                    </AdminRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/tags/${params.boardName}`
                    ),
            },
            {
                path: "/678170a9caf9f7e3/boards/:boardName/:subjectName",
                element: (
                    <AdminRoute>
                        <AdminBoardYears />
                    </AdminRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/678170a9caf9f7e3/boards/:boardName/:subjectName/:year",
                element: (
                    <AdminRoute>
                        <AdminBoardQuestion />
                    </AdminRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${params.subjectName}`
                    ),
            },
            {
                path: "/678170a9caf9f7e3/add-question",
                element: (
                    <AdminRoute>
                        <AddQuestion />
                    </AdminRoute>
                ),
            },
            {
                path: "/678170a9caf9f7e3/users",
                element: (
                    <AdminRoute>
                        <AdminUsers />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default Router;
