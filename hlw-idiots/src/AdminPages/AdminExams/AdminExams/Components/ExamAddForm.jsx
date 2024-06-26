import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ExamAddForm = ({ closeModal, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        data.totalQuestions = parseInt(data.totalQuestions);
        data.positiveMarking = parseInt(data.positiveMarking);
        data.negativeMarking = parseFloat(data.negativeMarking);
        data.slug = data.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
        axiosSecure.post("exams", data).then((response) => {
            closeModal();
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: `Exam Added!`,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="admin-label">
                    Exam Title
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder={`Exam Title`}
                    className="admin-input mb-2"
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <p className="text-red-600">Exam Title is required</p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="mb-4">
                    <label htmlFor="type" className="admin-label">
                        Exam Type
                    </label>
                    <select
                        id="type"
                        defaultValue={""}
                        className="admin-input mb-2"
                        {...register("type", { required: true })}
                    >
                        <option value="">Exam Type</option>
                        <option value="live">Live Exam</option>
                        <option value="rapid">Rapid Fire</option>
                    </select>
                    {errors.type?.type === "required" && (
                        <p className="text-red-600">Exam Type is required</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="privilege" className="admin-label">
                        Exam Privilege
                    </label>
                    <select
                        id="privilege"
                        defaultValue={""}
                        className="admin-input mb-2"
                        {...register("privilege", { required: true })}
                    >
                        <option value="">Exam Privilege</option>
                        <option value="free">Free Exam</option>
                        <option value="paid">Paid Exam</option>
                    </select>
                    {errors.privilege?.type === "required" && (
                        <p className="text-red-600">
                            Exam Privilege is required
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="admin-label">
                        Duration
                    </label>
                    <input
                        type="text"
                        id="duration"
                        placeholder={`Duration in minutes`}
                        className="admin-input mb-2"
                        {...register("duration", { required: true })}
                    />
                    {errors.duration?.type === "required" && (
                        <p className="text-red-600">Duration is required</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="mb-4">
                    <label htmlFor="totalQuestions" className="admin-label">
                        Total Questions
                    </label>
                    <input
                        type="text"
                        id="totalQuestions"
                        placeholder={`Total Questions`}
                        className="admin-input mb-2"
                        {...register("totalQuestions", { required: true })}
                    />
                    {errors.totalQuestions?.type === "required" && (
                        <p className="text-red-600">
                            Total Questions is required
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="positiveMarking" className="admin-label">
                        Positive Marking
                    </label>
                    <input
                        type="text"
                        id="positiveMarking"
                        placeholder={`Positive Marking`}
                        className="admin-input mb-2"
                        {...register("positiveMarking", { required: true })}
                    />
                    {errors.positiveMarking?.type === "required" && (
                        <p className="text-red-600">
                            Positive Marking is required
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="negativeMarking" className="admin-label">
                        Negative Marking
                    </label>
                    <input
                        type="text"
                        id="negativeMarking"
                        placeholder={`Negative Marking`}
                        className="admin-input mb-2"
                        {...register("negativeMarking", { required: true })}
                    />
                    {errors.negativeMarking?.type === "required" && (
                        <p className="text-red-600">
                            Negative Marking is required
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                    <label htmlFor="startTime" className="admin-label">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        placeholder={`Start Time`}
                        className="admin-input mb-2"
                        {...register("startTime", { required: true })}
                    />
                    {errors.startTime?.type === "required" && (
                        <p className="text-red-600">Start Time is required</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="endTime" className="admin-label">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        placeholder={`End Time`}
                        className="admin-input mb-2"
                        {...register("endTime", { required: true })}
                    />
                    {errors.endTime?.type === "required" && (
                        <p className="text-red-600">End Time is required</p>
                    )}
                </div>
            </div>

            <button type="submit" className="admin-btn">
                Add Exam
            </button>
        </form>
    );
};

export default ExamAddForm;
