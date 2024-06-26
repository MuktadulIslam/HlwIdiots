import { Link, useLoaderData, useParams } from "react-router-dom";
import useYears from "../../../Hooks/useYears";
import useTagsBySlug from "../../../Hooks/useTagsBySlug";

const BoardYears = () => {
    const subject = useLoaderData();
    const { boardName } = useParams();
    const [years] = useYears(boardName);
    const [board] = useTagsBySlug(boardName);

    return (
        <div>
            <div className="card">
                <div className="card-white text-center mb-5">
                    <p>{board.bnName}</p>
                    <h4 className="text-xl font-semibold">{subject.bnName} {subject.bnPaper}</h4>
                </div>

                <div className="grid gap-2">
                    {
                        years.map((year, index) => <Link to={`${year.slug}`} key={index} className="card-sm">
                            {year.bnName}
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default BoardYears;