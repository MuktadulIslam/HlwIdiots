import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MonthlyTopper = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: toppers = [] } = useQuery({
        queryKey: ["monthly-toppers"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get("monthly-toppers");
            return response.data;
        },
    });

    return (
        <div className="grid grid-cols-3 gap-5">
            {isLoading ||
                toppers.slice(0, 3).map((topper, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2"
                    >
                        <img
                            src={topper.profileImg}
                            alt=""
                            className="md:w-1/2 rounded-full"
                        />

                        <div className="text-center">
                            <h4 className="text-sm font-semibold mb-1">
                                {topper.name}
                            </h4>
                            <p className="text-xs">{topper.college}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default MonthlyTopper;
