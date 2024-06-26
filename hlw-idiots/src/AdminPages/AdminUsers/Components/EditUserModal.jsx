import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

const EditUserModal = ({ isOpen, closeModal, refetch, modalData }) => {
    const [axiosSecure] = useAxiosSecure();

    // hook form
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const name = modalData.name || null;
    const phone = modalData.phone || null;
    const role = modalData.role || null;
    const status = modalData.status || null;

    useEffect(() => {
        setValue('name', name);
        setValue('phone', phone);
        setValue('role', role);
        setValue('status', status);
    }, [setValue, name, phone, role, status]);

    const onSubmit = data => {
        axiosSecure.patch(`admin-users/${modalData._id}`, data)
            .then(response => {
                closeModal();
                if (response.data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "User Edited!",
                        icon: "success"
                    });
                    refetch();
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
                                    Edit User
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
                                            <label htmlFor="phone" className="admin-label">Phone</label>
                                            <input type="text" id="phone" className="admin-input" placeholder="Phone" {...register("phone", { required: true })} />
                                            {errors.phone?.type === "required" && (
                                                <p className="text-red-600">Phone is required</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="mb-4">
                                                <label htmlFor="role" className="admin-label">Role</label>
                                                <select id="role" className="admin-input" defaultValue={"Questioner"} {...register("role", { required: true })} onLoad={setValue("name", modalData.name)}>
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
                                            Edit User
                                        </button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditUserModal;