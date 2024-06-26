import { useParams } from "react-router-dom";
import TagAddModal from "./Components/TagAddModal";
import TagsTable from "./Components/TagsTable";
import useTagsByType from "../../../Hooks/useTagsByType";

const AdminTags = () => {
    const { tagType } = useParams();
    const [data, isLoading, refetch] = useTagsByType(tagType);
    let tagCategory, type;

    if (tagType === 'boards') {
        type = 'board';
        tagCategory = "Board";
    } else if (tagType === 'colleges') {
        type = 'college';
        tagCategory = "College";
    } else if (tagType === 'exams') {
        type = 'exam';
        tagCategory = "College Exam";
    } else if (tagType === 'books') {
        type = 'book';
        tagCategory = "Book";
    } else if (tagType === 'years') {
        type = 'year';
        tagCategory = "Year";
    }

    return (
        <div>
            <TagAddModal 
                tagCategory={tagCategory} 
                type={type} 
                refetch={refetch} 
            />

            <TagsTable
                data={data}
                isLoading={isLoading}
                refetch={refetch}
                tagCategory={tagCategory}
            />
        </div>
    );
};

export default AdminTags;