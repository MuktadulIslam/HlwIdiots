import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { Controller } from "react-hook-form";

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

const OptionInput = ({ setValue, control, index, o, oIndex, optionValueHandler }) => {
    return (
        <div>
            <label htmlFor="option" className="admin-label">Option ({oIndex})</label>
            <Controller
                name="options"
                control={control}
                defaultValue=""
                render={() => (
                    <CKEditor
                        editor={ClassicEditor}
                        config={ckTool}
                        data={o}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            optionValueHandler(index, data);
                        }}
                    />
                )}
            />
        </div>
    );
};

export default OptionInput;