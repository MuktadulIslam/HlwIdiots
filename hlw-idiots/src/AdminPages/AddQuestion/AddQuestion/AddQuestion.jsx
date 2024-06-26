import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const optionIndex = ['A', 'B', 'C', 'D'];

const AddQuestion = () => {
    const [selected, setSelected] = useState(optionIndex[0])

    // hook form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="question" className="admin-label">Question Title</label>
                    <input type="text" id="question" className="admin-input" {...register("title", { required: true })} />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600">Question title is required</p>
                    )}
                </div>

                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        {optionIndex.map((o, oIndex) => (
                            <div key={oIndex}>
                                <RadioGroup.Option
                                    value={o}
                                    className={"flex items-start gap-2 cursor-pointer"}
                                >
                                    <div className={`w-7 h-7 flex justify-center items-center shadow-md rounded-full ${(selected === o ? 'bg-black text-white' : 'bg-white')}`}>{o}</div>
                                    <input type="text" id="question" className="admin-input" {...register(`answer${oIndex}`, { required: true })} />
                                    {errors[`answer${oIndex}`]?.type === "required" && (
                                        <p className="text-red-600">Answer is required</p>
                                    )}
                                </RadioGroup.Option>
                                <input type="hidden" {...register('correctAnswer')} onChange={setValue(`correctAnswer`, selected)} />
                            </div>
                        ))}
                    </div>
                </RadioGroup>

                <button type="submit" className="admin-btn">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;