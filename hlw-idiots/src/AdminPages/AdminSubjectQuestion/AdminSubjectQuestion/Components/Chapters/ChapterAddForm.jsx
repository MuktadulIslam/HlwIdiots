import { useForm } from "react-hook-form";
import useAdmin from "../../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ChapterAddForm = ({ subject, closeModal, refetchChapters }) => {
    const [isAdmin] = useAdmin();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        data.name = data.chapterEn;
        data.bnName = data.chapterBn;
        data.type = "chapter";
        data.slug = data.chapterEn.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
        data.subject = subject.slug;
        data.createdBy = isAdmin.email;
        data.createdAt = new Date();
        delete data.chapterEn;
        delete data.chapterBn;
        axiosSecure.post("tags", data)
            .then(response => {
                closeModal();
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Chapter Added!",
                        icon: "success"
                    });
                    refetchChapters();
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="chapterEn" className="admin-label">Chapter Name (English)</label>
                <input type="text" id="chapterEn" placeholder="Chapter Name in English" className="admin-input mb-2" {...register("chapterEn", { required: true })} />
                {errors.chapterEn?.type === "required" && (
                    <p className="text-red-600">Book Name is required</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="chapterBn" className="admin-label">Chapter Name (Bangla)</label>
                <input type="text" id="chapterBn" placeholder="Chapter Name in Bangla" className="admin-input mb-2" {...register("chapterBn", { required: true })} />
                {errors.chapterBn?.type === "required" && (
                    <p className="text-red-600">Bangla Name is required</p>
                )}
            </div>

            <button type="submit" className="admin-btn">
                Add Chapter
            </button>
        </form>
    );
};

export default ChapterAddForm;