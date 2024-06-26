import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { Controller, useForm } from "react-hook-form";
import OptionInput from "./Components/OptionInput";
import Select from 'react-select';
import useTags from "../../../../../Hooks/useTags";
import QuestionExplaination from "./Components/QuestionExplaination";
import { useEffect } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const optionsIndex = ['A', 'B', 'C', 'D'];

const QuestionEditForm = ({ refetchQuestionsBank, editableQuestion, setEditMode }) => {
    const [tags] = useTags();
    const [axiosSecure] = useAxiosSecure();
    
    const tagsOptions = tags.map(tag => {
        if (tag?.college) {
            return { value: tag.slug, label: tag.name + ' | ' + tag.collegeName + ' | ' + tag.subjectName };
        } else if (tag?.board) {
            return { value: tag.slug, label: tag.name + ' | ' + tag.boardName };
        } else {
            return { value: tag.slug, label: tag.name };
        }
    });

    const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm();

    const optionValueHandler = (index, data) => {
        setValue(`option${index}`, data);
    }

    const onSubmit = data => {
        data.options = [0, 1, 2, 3].map(o => data[`option${o}`]);
        data.correctAnswer = data.options[data.correctAnswer];
        data.tags = data.tags.map(t => t.value);
        delete data.option0;
        delete data.option1;
        delete data.option2;
        delete data.option3;
        axiosSecure.patch(`questions/${editableQuestion._id}`, data)
            .then(response => {
                if (response.data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "Question Edited!",
                        icon: "success"
                    });
                    setEditMode(false);
                    refetchQuestionsBank();
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

    const editableQuestionImg = editableQuestion.questionImg || null;
    const editableQuestionName = editableQuestion.question || null;
    const editableOptions = editableQuestion.options || [];
    const editableTags = editableQuestion?.tags || [];
    const editableCorrectAnswer = editableQuestion.correctAnswer || null;
    const editableExplaination = editableQuestion.explaination || null;

    const editableCorrectAnswerIndex = editableOptions.indexOf(editableCorrectAnswer);

    useEffect(() => {
        setValue('questionImg', editableQuestionImg);
        setValue('question', editableQuestionName);
        editableOptions.map((o, index) => setValue(`option${index}`, o))
        setValue('correctAnswer', editableCorrectAnswerIndex);
        setValue('tags', editableTags);
        setValue('explaination', editableExplaination);
    }, [setValue, editableTags, editableCorrectAnswerIndex, editableQuestionImg, editableQuestionName, editableOptions, editableExplaination]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
            <div className="mb-4">
                <label htmlFor="question" className="admin-label">Question (Image optional)</label>
                <input type="text" placeholder="Question Image URL" className="admin-input mb-2" {...register("questionImg")} />
                <Controller
                    name="question"
                    control={control}
                    defaultValue=""
                    render={() => (
                        <CKEditor
                            editor={ClassicEditor}
                            data={editableQuestion.question}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue('question', data);
                            }}
                        />
                    )}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-2 mb-4">
                {editableOptions.map((o, index) => (
                    <OptionInput
                        key={index}
                        control={control}
                        optionValueHandler={optionValueHandler}
                        index={index}
                        oIndex={optionsIndex[index]}
                        o={o}
                    />
                ))}
            </div>

            <div className="mb-4">
                <div>
                    <label className="admin-label">Correct Answer *</label>
                    <select className="admin-input" {...register("correctAnswer", { required: true })}>
                        {optionsIndex.map((o, oIndex) => <option key={oIndex} value={oIndex}>{o}</option>)}
                    </select>
                    {errors.correctAnswer?.type === "required" && (
                        <p className="text-red-600">Correct Answer is required</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="admin-label">Explanation *</label>
                <Controller
                    name="explaination"
                    control={control}
                    render={() => (
                        <QuestionExplaination setValue={setValue} explaination={editableQuestion.explaination} />
                    )}
                />
            </div>

            <div className="mb-4">
                <label className="admin-label">Tags *</label>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            defaultValue={editableTags}
                            value={field.value}
                            onChange={(selectedOption) => {
                                field.onChange(selectedOption)
                            }}
                            options={tagsOptions}
                            isMulti={true}
                        />
                    )}
                />
            </div>

            <button type="submit" className="admin-btn">
                Edit Question
            </button>
        </form>
    );
};

export default QuestionEditForm;