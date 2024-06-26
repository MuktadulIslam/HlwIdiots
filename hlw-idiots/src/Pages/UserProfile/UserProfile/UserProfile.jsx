import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import PersonalProfileData from "../Components/PersonalProfileData";

const UserProfile = () => {
    const [userData] = useUserData();
    const [axiosSecure] = useAxiosSecure();
    const { data: userAchievements = [] } = useQuery({
        queryKey: ["user-achievements"],
        enabled: userData?._id && true,
        queryFn: async () => {
            const response = await axiosSecure.get(
                `user-profile/${userData._id}`
            );
            return response.data;
        },
    });

    return (
        <div>
            <PersonalProfileData />

            <div className="card">
                <SectionTitle title={"Personal Achievement"} />

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-[#676767] text-white shadow-md text-center px-3 py-1">
                        <span className="text-[#FFF7AD]">Exam Done: </span>
                        {userAchievements?.totalExam}
                    </div>

                    <div className="bg-[#676767] text-white shadow-md text-center px-3 py-1">
                        <span className="text-[#FFF7AD]">MCQ Solved: </span>
                        {userAchievements?.mcqSolved}
                    </div>

                    <div className="bg-[#676767] text-white shadow-md text-center px-3 py-1">
                        <span className="text-[#FFF7AD]">Rapid Fire: </span>
                        {userAchievements?.totalRapidExam}
                    </div>

                    <div className="bg-[#676767] text-white shadow-md text-center px-3 py-1">
                        <span className="text-[#FFF7AD]">Live Exams: </span>
                        {userAchievements?.totalLiveExam}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
