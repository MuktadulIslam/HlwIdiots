import { useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import ChapterEditModal from "./ChapterEditModal";

const ChaptersTable = ({ chapters, isLoadingChapters, refetchChapters }) => {
    const [axiosSecure] = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [modalChapter, setModalChapter] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(slug) {
        setIsOpen(true);
        axiosSecure.get(`tags/${slug}`)
            .then(response => {
                setModalChapter(response.data);
            })
    }

    const handleDelete = chapter => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${chapter.chapterEn}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`tags/${chapter._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Deleted Successfull.",
                                icon: "success"
                            });
                            refetchChapters();
                        }
                    })
            }
        });
    }

    return (
        <div className="relative overflow-x-auto border py-5 sm:rounded-lg">
            <table className="md:w-full align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-center">SI</th>
                        <th className="pb-3 text-start">Name</th>
                        <th className="pb-3 text-start">BN Name</th>
                        <th className="pb-3 text-center">Published</th>
                        <th className="pb-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        chapters.map((chapter, index) => <tr
                            key={chapter._id}
                            className="border-b border-dashed last:border-b-0"
                        >
                            <td className="p-3 text-center">{index + 1}</td>
                            <td className="p-3 pl-0 text-start">{chapter.name}</td>
                            <td className="p-3 pl-0">{chapter.bnName}</td>
                            <td className="p-3 text-center">{moment(chapter.insertDate).format("L")}</td>
                            <td className="p-3 text-center">
                                <div className="flex justify-center items-center gap-2">
                                    <button type="button" onClick={() => openModal(chapter.slug)} className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                        <FaRegEdit className="w-4 h-4" />
                                    </button>

                                    <button type="button" onClick={() => handleDelete(chapter)} className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                        <FaTrashAlt className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <ChapterEditModal 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                refetchChapters={refetchChapters}
                modalChapter={modalChapter}
            />
        </div>
    );
};

export default ChaptersTable;