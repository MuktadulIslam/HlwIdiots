import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const ChapterEditForm = ({ modalChapter, closeModal, refetchChapters }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, setValue } = useForm();

    const onSubmit = (data) => {
        data.name = data.chapterEn;
        data.bnName = data.chapterBn;
        delete data.chapterEn;
        delete data.chapterBn;
        axiosSecure.patch(`tags/${modalChapter._id}`, data)
            .then(response => {
                closeModal();
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Book Edited!",
                        icon: "success"
                    });
                    refetchChapters();
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
                <input type="text" id="chapterEn" placeholder="Chapter Name in English" className="admin-input mb-2" {...register("chapterEn")} onLoad={setValue("chapterEn", modalChapter.name)} />
            </div>

            <div className="mb-4">
                <label htmlFor="chapterBn" className="admin-label">Chapter Name (Bangla)</label>
                <input type="text" id="chapterBn" placeholder="Chapter Name in Bangla" className="admin-input mb-2" {...register("chapterBn")} onLoad={setValue("chapterBn", modalChapter.bnName)} />
            </div>

            <button type="submit" className="admin-btn">
                Edit Chapter
            </button>
        </form>
    );
};

export default ChapterEditForm;