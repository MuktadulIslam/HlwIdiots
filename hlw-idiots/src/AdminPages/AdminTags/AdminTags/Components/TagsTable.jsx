import moment from 'moment';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import Swal from 'sweetalert2';
import TagEditModal from './TagEditModal';

const TagsTable = ({ data, isLoading, refetch, tagCategory }) => {
    const [axiosSecure] = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(slug) {
        setIsOpen(true);
        axiosSecure.get(`tags/${slug}`)
            .then(response => {
                setModalData(response.data);
            })
    }

    const handleDelete = book => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${book.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`tags/${book._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Deleted Successfull.",
                                icon: "success"
                            });
                            refetch();
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
                        data.map((book, index) => <tr
                            key={book._id}
                            className="border-b border-dashed last:border-b-0"
                        >
                            <td className="p-3 text-center">{index + 1}</td>
                            <td className="p-3 pl-0 text-start">{book.name}</td>
                            <td className="p-3 pl-0">{book.bnName}</td>
                            <td className="p-3 text-center">{moment(book.insertDate).format("L")}</td>
                            <td className="p-3 text-center">
                                <div className="flex justify-center items-center gap-2">
                                    <button type="button" onClick={() => openModal(book.slug)} className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                        <FaRegEdit className="w-4 h-4" />
                                    </button>

                                    <button type="button" onClick={() => handleDelete(book)} className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                        <FaTrashAlt className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <TagEditModal 
                isOpen={isOpen}
                closeModal={closeModal}
                refetch={refetch}
                modalData={modalData}
                tagCategory={tagCategory}
            />
        </div>
    );
};

export default TagsTable;