import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useImages from "../../../Hooks/useImages";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import useCopyToClipboard from "../../../Hooks/useCopyToClipboard";

const AdminGallery = () => {
    const [axiosSecure] = useAxiosSecure();
    const [images, , refetch] = useImages(0, 20);
    const copyToClipboardHandler = useCopyToClipboard();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        axiosSecure.post("media", formData).then((response) => {
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: `Media Added!`,
                    icon: "success",
                });
                refetch();
            } else if (response.data.error && response.data.error === true) {
                Swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something wrong!",
                    icon: "error",
                });
            }
            reset();
        });
    };

    const handleDelete = (img) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete this image`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`media/${img._id}`).then((response) => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("image", { required: true })} />
                {errors.image && <span>This field is required</span>}
                <button type="submit" className="admin-btn">
                    Upload
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
                {images.map((img) => (
                    <div key={img._id}>
                        <div className="flex justify-center items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    copyToClipboardHandler(
                                        `${import.meta.env.VITE_SERVER_BASE_URL}/${img.image}`
                                    )
                                }
                                className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                            >
                                <FaRegCopy className="w-4 h-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(img)}
                                className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                            >
                                <FaTrashAlt className="w-4 h-4" />
                            </button>
                        </div>
                        <img
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${img.image}`}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
