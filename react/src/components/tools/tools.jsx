import './tools.css'
import SaveButton from "./saveButton/saveButton.jsx";

function Tools(props) {
    return <div id="tools">
        {
            props.extractSchema
            &&
            <ExtractButton
                extractSchema={props.extractSchema}
                editorRef={props.editorRef}
            />
        }
        <SaveButton
            editorRef={props.editorRef}
        />
    </div>
}


export default Tools