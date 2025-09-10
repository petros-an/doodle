import './tools.css'
import SaveButton from "./saveButton/saveButton.jsx";
import AboutButton from "./aboutButton/aboutButton.jsx";
import ShareButton from "./shareButton/shareButton.jsx";

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
        <ShareButton doodleId={props.doodleId}/>
    </div>
}


export default Tools