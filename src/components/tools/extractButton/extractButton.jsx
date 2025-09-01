import './extractButton.css'
import { FcIdea } from "react-icons/fc";


function ExtractButton(props) {
    return <span
        id={"extract_button"}
        onClick={
            () => {
                props.editorRef.extractSchema(
                    props.extractSchema
                )
            }
        }
    >
        <FcIdea/> Extract
    </span>
}

export default ExtractButton
