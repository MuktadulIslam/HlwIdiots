import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { Controller, useForm } from "react-hook-form";
import OptionInput from "./Components/OptionInput";
import Select from 'react-select';
import useTags from "../../../../../Hooks/useTags";
import useAdmin from "../../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import QuestionExplainatonAdd from "./Components/QuestionExplainatonAdd";
import { useEffect } from "react";

const ckTool = {
    toolbar: {
        shouldNotGroupWhenFull: false,
        items: [
            "heading",
            "outdent",
            "indent",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "insertTable",
            "blockQuote",
            "undo",
            "redo",
            "|",
            "MathType",
            "ChemType"
        ]
    }
};

const optionsIndex = ['A', 'B', 'C', 'D'];

const QuestionAddForm = ({ subjectName, refetchQuestionsBank }) => {
    const selectedOption = "";
    const [isAdmin] = useAdmin();
    const [axiosSecure] = useAxiosSecure();
    const [tags] = useTags();

    const tagsOptions = tags.map(tag => {
        if (tag?.college) {
            return { value: tag.slug, label: tag.name + ' | ' + tag.collegeName + ' | ' + tag.subjectName };
        } else if (tag?.board) {
            return { value: tag.slug, label: tag.name + ' | ' + tag.boardName };
        } else {
            return { value: tag.slug, label: tag.name };
        }
    });

    const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm();

    const optionValueHandler = (index, data) => {
        setValue(`option${index}`, data);
    }

    const onSubmit = data => {
        data.options = [0, 1, 2, 3].map(o => data[`option${o}`]);
        data.correctAnswer = data.options[data.correctAnswer];
        data.tags = data.tags.map(t => t.value);
        data.subject = subjectName;
        data.questionType = "bank";
        data.questionCategory = "regular-mcq";
        data.questionCount = 1;
        data.insertBy = isAdmin.email;
        data.insertDate = new Date();
        delete data.option0;
        delete data.option1;
        delete data.option2;
        delete data.option3;
        axiosSecure.post("questions", data)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Year Added!",
                        icon: "success"
                    });
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

    useEffect(() => {
        setValue('tags', { value: 'one-shot-revision', label: 'One-shot Revision' });
    }, [setValue]);

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
                            config={ckTool}
                            data={""}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue('question', data);
                            }}
                        />
                    )}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-2 mb-4">
                {
                    optionsIndex.map((oIndex, index) => <OptionInput
                        key={index}
                        control={control}
                        optionValueHandler={optionValueHandler}
                        index={index}
                        oIndex={oIndex}
                        o={oIndex}
                    />)
                }
            </div>

            <div className="mb-4">
                <div>
                    <label className="admin-label">Correct Answer *</label>
                    <select defaultValue={"0"} className="admin-input" {...register("correctAnswer", { required: true })}>
                        {
                            optionsIndex.map((o, oIndex) => <option key={oIndex} value={oIndex}>{o}</option>)
                        }
                    </select>
                    {errors.correctAnswer?.type === "required" && (
                        <p className="text-red-600">Correct Answer is required</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="admin-label">Explaination *</label>
                <Controller
                    name="explaination"
                    control={control}
                    render={() => (
                        <QuestionExplainatonAdd setValue={setValue} />
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
                            defaultValue={selectedOption}
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
                Add Question
            </button>
        </form>
    );
};

export default QuestionAddForm;