import { useState } from "react";
import useAdminUsers from "../../../Hooks/useAdminUsers";
import AddUserModal from "../Components/AddUserModal";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EditUserModal from "../Components/EditUserModal";

const AdminUsers = () => {
    const [adminUsers, , refetch] = useAdminUsers();
    const [axiosSecure] = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(id) {
        setIsOpen(true);
        axiosSecure.get(`admin-users/id/${id}`)
            .then(response => {
                setModalData(response.data);
            })
    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${user.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`admin-users/${user._id}`)
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
        <div>
            <AddUserModal
                refetch={refetch}
            />

            <div className="relative overflow-x-auto border py-5 sm:rounded-lg">
                <table className="md:w-full align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                            <th className="px-4">SI</th>
                            <th className="px-4">Name</th>
                            <th className="px-4">Phone</th>
                            <th className="px-4">Role</th>
                            <th className="px-4">Status</th>
                            <th className="px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {adminUsers.map((user, index) => (
                            <tr key={index} className={"border-b border-dashed last:border-b-0"}>
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-start">{user.name}</td>
                                <td className="p-3 text-center">{user.phone}</td>
                                <td className="p-3 text-center">{user.role}</td>
                                <td className="p-3 text-center">{user.status}</td>
                                <td className="p-3 text-sm">
                                    <div className="flex justify-center items-center gap-2">
                                        <button type="button" onClick={() => openModal(user._id)} className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                            <FaRegEdit className="w-4 h-4" />
                                        </button>

                                        <button type="button" onClick={() => handleDelete(user)} className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                            <FaTrashAlt className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <EditUserModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    refetch={refetch}
                    modalData={modalData}
                />
            </div>
        </div>
    );
};

export default AdminUsers;