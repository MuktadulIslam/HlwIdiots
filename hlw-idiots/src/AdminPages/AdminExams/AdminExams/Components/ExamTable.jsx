import moment from "moment";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import ExamEditModal from "./ExamEditModal";
import { Link } from "react-router-dom";

const ExamTable = ({ exams, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(slug) {
        setIsOpen(true);
        axiosSecure.get(`exams/slug/${slug}`).then((response) => {
            console.log(response.data);
            setModalData(response.data);
        });
    }

    const handleDelete = (exam) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${exam.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`exams/${exam._id}`).then((response) => {
                    if (response.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Deleted Successfull.",
                            icon: "success",
                        });
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <div className="relative overflow-x-auto border py-5 sm:rounded-lg">
            <table className="md:w-full align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-center">SI</th>
                        <th className="pb-3 text-start">Name</th>
                        <th className="pb-3 text-center">Published</th>
                        <th className="pb-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {exams &&
                        exams.map((exam, index) => (
                            <tr
                                key={exam._id}
                                className="border-b border-dashed last:border-b-0"
                            >
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 pl-0 text-start">
                                    {exam.name}
                                </td>
                                <td className="p-3 text-center">
                                    {moment(exam.startTime).format("llll")}
                                </td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link to={`${exam.slug}/0`}>
                                            <button
                                                type="button"
                                                className="text-teal-800 bg-teal-100 hover:bg-teal-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                            >
                                                <FaQuestion className="w-4 h-4" />
                                            </button>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => openModal(exam.slug)}
                                            className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        >
                                            <FaRegEdit className="w-4 h-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(exam)}
                                            className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        >
                                            <FaTrashAlt className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ExamEditModal
                isOpen={isOpen}
                closeModal={closeModal}
                refetch={refetch}
                modalData={modalData}
            />
        </div>
    );
};

export default ExamTable;
