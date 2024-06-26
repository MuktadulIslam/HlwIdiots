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

const QuestionExplaination = ({ setValue, explaination }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={ckTool}
            data={explaination ? explaination : ""}
            onChange={(event, editor) => {
                const data = editor.getData();
                setValue('explaination', data);
            }}
        />
    );
};

export default QuestionExplaination;