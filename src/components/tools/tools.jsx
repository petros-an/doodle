import './tools.css'
import ExtractButton from "./extractButton/extractButton.jsx";

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
    </div>
}


export default Tools