import './tools.css'
import SaveButton from "./saveButton/saveButton.jsx";
import AboutButton from "./aboutButton/aboutButton.jsx";
import ShareButton from "./shareButton/shareButton.jsx";
import ExtractButton from "./extractButton/extractButton.jsx";
import NewButton from "./newButton/newButton.jsx";

function Tools(props) {
    return <div id="tools">
        <NewButton/>
        <SaveButton
            editorRef={props.editorRef}
        />
        <AboutButton/>
        <ShareButton doodleId={props.doodleId}/>
        {
            props.extractSchema
            &&
            <ExtractButton
                extractSchema={props.extractSchema}
                editorRef={props.editorRef}
            />
        }
    </div>
}


export default Tools