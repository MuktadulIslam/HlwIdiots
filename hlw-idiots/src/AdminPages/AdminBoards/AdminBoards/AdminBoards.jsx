import { Link } from "react-router-dom";
import useBoards from "../../../Hooks/useBoards";

const AdminBoards = () => {
    const [boards] = useBoards();

    return (
        <div className="grid md:grid-cols-2 gap-2">
            {boards.map((board, index) => (
                <Link
                    to={`/678170a9caf9f7e3/boards/${board.slug}`}
                    key={index}
                    className="admin-widget"
                >
                    {board.bnName}
                </Link>
            ))}
        </div>
    );
};

export default AdminBoards;
