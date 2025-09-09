import './tools.css'
import SaveButton from "./saveButton/saveButton.jsx";
import AboutButton from "./aboutButton/aboutButton.jsx";

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
        <AboutButton/>
    </div>
}


export default Tools