import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";

const ckTool = {
    toolbar: {
        shouldNotGroupWhenFull: false,
        items: [
            "heading",
            "outdent",
            "indent",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "insertTable",
            "blockQuote",
            "undo",
            "redo",
            "|",
            "MathType",
            "ChemType"
        ]
    }
};

const QuestionExplainatonAdd = ({ setValue }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={ckTool}
            data={""}
            onChange={(event, editor) => {
                const data = editor.getData();
                setValue('explaination', data);
            }}
        />
    );
};

export default QuestionExplainatonAdd;