import Swal from "sweetalert2";
import useAdmin from "../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import useColleges from "../../../../Hooks/useColleges";
import Select from 'react-select';
import useSubjects from "../../../../Hooks/useSubjects";
import useBoards from "../../../../Hooks/useBoards";

const TagAddForm = ({ type, tagCategory, closeModal, refetch }) => {
    const selectedOption = "";
    const [isAdmin] = useAdmin();
    const [axiosSecure] = useAxiosSecure();
    let collegesTag = [];
    const [subjects] = useSubjects();
    const [boards] = useBoards();
    if (tagCategory === 'College Exam') {
        const [colleges] = useColleges();
        collegesTag = colleges.map(college => ({ value: college.slug, label: college.name }));
    }

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        data.type = type;
        data.slug = data.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
        if (tagCategory === 'College Exam') {
            data.college = data.college.value;
        }
        data.createdBy = isAdmin.email;
        data.createdAt = new Date();
        axiosSecure.post("tags", data)
            .then(response => {
                closeModal();
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: `${tagCategory} Added!`,
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="admin-label">{tagCategory} {tagCategory === 'College Exam' && 'with year'} (English)</label>
                <input type="text" id="name" placeholder={`${tagCategory} in English`} className="admin-input mb-2" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <p className="text-red-600">{tagCategory} is required</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="bnName" className="admin-label">{tagCategory} {tagCategory === 'College Exam' && 'with year'} (Bangla)</label>
                <input type="text" id="bnName" placeholder={`${tagCategory} in Bangla`} className="admin-input mb-2" {...register("bnName", { required: true })} />
                {errors.bnName?.type === "required" && (
                    <p className="text-red-600">{tagCategory} Bangla is required</p>
                )}
            </div>

            {
                tagCategory === 'College Exam' && <div className="mb-4">
                    <label className="admin-label">College *</label>
                    <Controller
                        name="college"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                defaultValue={selectedOption}
                                value={field.value}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption)
                                }}
                                options={collegesTag}
                            />
                        )}
                    />
                </div>
            }

            {
                tagCategory === 'College Exam' && <div className="mb-4">
                    <label className="admin-label">Subject</label>
                    <select className="admin-input z-30 mb-2" defaultValue={""} {...register("subject", { required: true })}>
                        <option value="" disabled>Choose Subject</option>
                        {
                            subjects.map((subject, index) => <option key={index} value={subject.slug}>{subject.bnName} {subject.bnPaper}</option>)
                        }
                    </select>
                    {errors.year?.type === "required" && (
                        <p className="text-red-600">{tagCategory} year is required</p>
                    )}
                </div>
            }

            {
                tagCategory === 'Year' && <div className="mb-4">
                    <label className="admin-label">Board *</label>
                    <select className="admin-input z-30 mb-2" defaultValue={""} {...register("board", { required: true })}>
                        <option value="" disabled>Choose Board</option>
                        {
                            boards.map((board, index) => <option key={index} value={board.slug}>{board.bnName}</option>)
                        }
                    </select>
                    {errors.year?.type === "required" && (
                        <p className="text-red-600">{tagCategory} year is required</p>
                    )}
                </div>
            }

            <button type="submit" className="admin-btn">
                Add {tagCategory}
            </button>
        </form>
    );
};

export default TagAddForm;