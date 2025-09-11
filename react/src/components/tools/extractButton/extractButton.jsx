import './extractButton.css'
import { FcIdea } from "react-icons/fc";
import {FaRegLightbulb} from "react-icons/fa";


function ExtractButton(props) {
    return <span
        className={"tool_button"}
        id={"extract_button"}
        onClick={
            () => {
                props.editorRef.extractSchema(
                    props.extractSchema
                )
            }
        }
    >
        <FaRegLightbulb/> Extract
    </span>
}

export default ExtractButton
