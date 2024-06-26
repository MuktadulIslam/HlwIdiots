import { FaCheckCircle } from "react-icons/fa";
import useUserData from "../../../Hooks/useUserData";

const PersonalProfileData = () => {
    const [userData] = useUserData();
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={userData.profileImg} alt="" />
            </div>

            <div>
                <div className="flex items-center gap-2 border-b pb-1">
                    <h4 className="text xl font-semibold">{userData.name}</h4>
                    <FaCheckCircle className="w-4 h-4 text-[#10C443]" />
                </div>

                <div className="mt-1">
                    <p className="text-xs text-black/65">{userData.college}</p>
                </div>
            </div>
        </div>
    );
};

export default PersonalProfileData;
