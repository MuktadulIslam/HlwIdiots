import { RadioGroup } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useDistricts from "../../../Hooks/useDistricts";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast from "react-hot-toast";

// avatars
const avatars = [
    {
        src: "https://i.ibb.co/0fRmWCZ/user1.jpg",
    },
    {
        src: "https://i.ibb.co/P5gCB3r/user2.jpg",
    },
    {
        src: "https://i.ibb.co/GtSrkSK/user3.jpg",
    },
    {
        src: "https://i.ibb.co/tqb4nyX/user4.jpg",
    },
    {
        src: "https://i.ibb.co/dB6CkyK/user5.jpg",
    },
    {
        src: "https://i.ibb.co/6ysM0c8/user6.jpg",
    },
    {
        src: "https://i.ibb.co/FgVkby8/user7.jpg",
    },
];

const Register = () => {
    // neccessary variables
    const [userData] = useUserData();
    const [districts] = useDistricts();
    const [selected, setSelected] = useState(avatars[0].src);
    const navigation = useNavigate();
    const location = useLocation();
    const destination = location.state?.form || "/";

    // hook form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    if (userData?.phone) {
        return <Navigate to={destination} replace="true"></Navigate>;
    }

    const onSubmit = (data) => {
        console.log(data);
        axios
            .patch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${userData.email}`, data)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    toast.success("User Created Successfully");
                    navigation("/", { replace: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // session array
    const sessions = [];
    for (let i = 2022; i < 2028; i++) {
        sessions.push(i);
    }

    return (
        <div>
            <Helmet>
                <title>Hlw Idiots | Register</title>
            </Helmet>

            <SectionTitle title={"তোমার সম্পর্কে জানতে চাই!"} />

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                <div className="grid gap-1">
                    <input
                        type="text"
                        className="input"
                        placeholder="নাম"
                        {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                        <p className="text-red-600">Name is required</p>
                    )}
                </div>

                <div className="grid gap-1">
                    <input
                        type="text"
                        className="input"
                        placeholder="কলেজ"
                        {...register("college", { required: true })}
                    />
                    {errors.college?.type === "required" && (
                        <p className="text-red-600">College is required</p>
                    )}
                </div>

                <div className="grid gap-1">
                    <select
                        defaultValue={""}
                        className="input"
                        {...register("session", { required: true })}
                    >
                        <option value="" disabled>
                            বর্ষ
                        </option>
                        {sessions.map((session) => (
                            <option key={session} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                    {errors.session?.type === "required" && (
                        <p className="text-red-600">Session is required</p>
                    )}
                </div>

                <div className="grid gap-1">
                    <input
                        type="text"
                        className="input"
                        placeholder="ফোন নাম্বার"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone?.type === "required" && (
                        <p className="text-red-600">Phone is required</p>
                    )}
                </div>

                <div className="grid gap-1">
                    <select
                        defaultValue={""}
                        className="input"
                        {...register("district", { required: true })}
                    >
                        <option value="" disabled>
                            বর্তমানে অবস্থানরত জেলা
                        </option>
                        {districts.map((d) => (
                            <option key={d._id} value={d.name}>
                                {d.bnName}
                            </option>
                        ))}
                    </select>
                    {errors.district?.type === "required" && (
                        <p className="text-red-600">Session is required</p>
                    )}
                </div>

                <div className="card">
                    <div className="card-sm font-semibold mb-4">
                        কোন অ্যাভাটারে নিজেকে প্রকাশ করতে চাও?
                    </div>

                    <div>
                        <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="sr-only">
                                Server size
                            </RadioGroup.Label>
                            <div className="grid grid-cols-4 gap-4">
                                {avatars.map((avatar, index) => (
                                    <RadioGroup.Option
                                        key={index}
                                        value={avatar.src}
                                        className={`relative`}
                                    >
                                        {({ checked }) => (
                                            <>
                                                <img
                                                    src={avatar.src}
                                                    alt=""
                                                    className="md:w-1/2 md:mx-auto rounded-full"
                                                />
                                                {checked && (
                                                    <div className="profile__overlay w-full md:w-1/2 h-full absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 flex justify-center items-center bg-[#997518]/20 rounded-full">
                                                        <FaCheck className="w-8 h-8 text-[#FFC327]" />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* radio value */}
                <input
                    type="hidden"
                    {...register("profileImg", { required: true })}
                    onChange={setValue("profileImg", selected)}
                />

                <button
                    type="submit"
                    className="px-4 py-2 text-white font-semibold bg-gradient-to-r from-[#FFC327] to-[#997518] rounded-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
