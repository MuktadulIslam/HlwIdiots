import { Link } from "react-router-dom";
import useSubjects from "../Hooks/useSubjects";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Subjects = ({ tag }) => {
    const [subjects] = useSubjects();
    const subjectsArray = subjects.map((s) => s.slug);
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: data = {} } = useQuery({
        queryKey: ["exist-subjects"],
        enabled: subjectsArray?.length > 0,
        queryFn: async () => {
            const response = await axiosSecure.post("exist-subject-questions", {
                subjects: subjectsArray,
                tag: tag,
            });
            return response.data;
        },
    });

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {!isLoading &&
                    data &&
                    Object.keys(data).map((key, index) => {
                        const subject = subjects.find(
                            (sub) => sub.slug === key
                        );

                        return (
                            subject &&
                            data[key] > 0 && (
                                <Link
                                    to={`${subject.slug}`}
                                    key={index}
                                    className="card-sm"
                                >
                                    <h4 className="text-lg font-semibold">
                                        {subject.bnName}
                                    </h4>
                                    <p className="text-sm">{subject.bnPaper}</p>
                                </Link>
                            )
                        );
                    })}
            </div>
        </div>
    );
};

export default Subjects;
