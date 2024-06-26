import { Link } from "react-router-dom";
import useBoards from "../../../Hooks/useBoards";

const Boards = () => {
    const [boards] = useBoards();

    return (
        <div>
            <div className="card">
                <div className="grid gap-2">
                    {
                        boards.map((board, index) => <Link to={`/boards/${board.slug}`} key={index} className="card-sm">
                            {board.bnName}
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Boards;