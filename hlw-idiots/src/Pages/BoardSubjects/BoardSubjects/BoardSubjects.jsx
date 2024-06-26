import { useLoaderData } from "react-router-dom";
import Subjects from "../../../Components/Subjects";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const BoardSubjects = () => {
    const board = useLoaderData();

    return (
        <div>
            <div className="card">
                <SectionTitle title={`${board.bnName}`} />

                <Subjects tag={board.slug} />
            </div>
        </div>
    );
};

export default BoardSubjects;
