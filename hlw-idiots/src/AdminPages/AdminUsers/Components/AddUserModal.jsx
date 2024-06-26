import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddUserModal = ({ refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.joinedDate = new Date();
        axiosSecure.post("admin-users", data)
            .then(response => {
                closeModal();
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Year Added!",
                        icon: "success"
                    });
                    refetch();
                } else if (response.data.error && response.data.error === true) {
                    Swal.fire({
                        title: "Error!",
                        text: response.data.message,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something wrong!",
                        icon: "error"
                    });
                }
                reset();
            })
    };

    return (
        <div>
            <div className="flex items-center justify-end mb-3">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-300 focus:outline-none"
                >
                    Add User
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add User
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-4">
                                                <label htmlFor="name" className="admin-label">Name *</label>
                                                <input type="text" id="name" className="admin-input" placeholder="Name" {...register("name", { required: true })} />
                                                {errors.name?.type === "required" && (
                                                    <p className="text-red-600">Name is required</p>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="email" className="admin-label">Email</label>
                                                <input type="text" id="email" className="admin-input" placeholder="Email" {...register("email", { required: true })} />
                                                {errors.email?.type === "required" && (
                                                    <p className="text-red-600">Email is required</p>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="phone" className="admin-label">Phone</label>
                                                <input type="text" id="phone" className="admin-input" placeholder="Phone" {...register("phone", { required: true })} />
                                                {errors.phone?.type === "required" && (
                                                    <p className="text-red-600">Phone is required</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="mb-4">
                                                    <label htmlFor="role" className="admin-label">Role</label>
                                                    <select id="role" className="admin-input" defaultValue={"Questioner"} {...register("role", { required: true })}>
                                                        <option value={"Admin"}>Admin</option>
                                                        <option value={"Questioner"}>Questioner</option>
                                                    </select>
                                                    {errors.role?.type === "required" && (
                                                        <p className="text-red-600">Role is required</p>
                                                    )}
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="status" className="admin-label">Status</label>
                                                    <select id="status" className="admin-input" defaultValue={"Active"} {...register("status", { required: true })}>
                                                        <option value={"Active"}>Active</option>
                                                        <option value={"Deactive"}>Deactive</option>
                                                    </select>
                                                    {errors.status?.type === "required" && (
                                                        <p className="text-red-600">Status is required</p>
                                                    )}
                                                </div>
                                            </div>

                                            <button type="submit" className="admin-btn">
                                                Add User
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default AddUserModal;