import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Select from 'react-select';
import useColleges from "../../../../Hooks/useColleges";
import useSubjects from "../../../../Hooks/useSubjects";
import useBoards from "../../../../Hooks/useBoards";

const TagEditForm = ({ modalData, closeModal, refetch, tagCategory }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, control, setValue } = useForm();
    let collegesTag = [];
    const [subjects] = useSubjects();
    const [boards] = useBoards();
    if (tagCategory === 'College Exam') {
        const [colleges] = useColleges();
        collegesTag = colleges.map(college => ({ value: college.slug, label: college.name }));
    }

    const name = modalData.name || null;
    const bnName = modalData.bnName || null;
    const subject = modalData?.subject || '';
    const college = modalData?.college || '';
    const board = modalData?.board || '';

    useEffect(() => {
        setValue('name', name);
        setValue('bnName', bnName);
        tagCategory === 'College Exam' && setValue('subject', subject);
        tagCategory === 'College Exam' && setValue('college', college);
        tagCategory === 'Year' && setValue('board', board);
    }, [setValue, name, bnName, subject, college, board, tagCategory]);

    const onSubmit = (data) => {
        if (tagCategory === 'College Exam') {
            data.college = data.college.value;
        }
        axiosSecure.patch(`tags/${modalData._id}`, data)
            .then(response => {
                closeModal();
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `${tagCategory} Edited!`,
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="admin-label">{tagCategory} (English)</label>
                <input type="text" id="name" placeholder={`${tagCategory} in English`} className="admin-input mb-2" {...register("name")} />
            </div>

            <div className="mb-4">
                <label htmlFor="bnName" className="admin-label">{tagCategory} (Bangla)</label>
                <input type="text" id="bnName" placeholder={`${tagCategory} in Bangla`} className="admin-input mb-2" {...register("bnName")} />
            </div>

            {
                tagCategory === 'College Exam' && <div className="mb-4">
                    <label className="admin-label">Tags *</label>
                    <Controller
                        name="college"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
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
                    <select className="admin-input z-30 mb-2" defaultValue={subject.slug} {...register("subject", { required: true })}>
                        <option value="" disabled>Choose Subject</option>
                        {
                            subjects.map((subject, index) => <option key={index} value={subject.slug}>{subject.bnName} {subject.bnPaper}</option>)
                        }
                    </select>
                </div>
            }

            {
                tagCategory === 'Year' && <div className="mb-4">
                    <label className="admin-label">Board *</label>
                    <select className="admin-input z-30 mb-2" defaultValue={board.slug} {...register("board", { required: true })}>
                        <option value="" disabled>Choose Board</option>
                        {
                            boards.map((board, index) => <option key={index} value={board.slug}>{board.bnName}</option>)
                        }
                    </select>
                </div>
            }

            <button type="submit" className="admin-btn">
                Edit {tagCategory}
            </button>
        </form>
    );
};

export default TagEditForm;