import './saveButton.css'
import {IoIosSave} from "react-icons/io";

function SaveButton(props) {
    return <span
        id="save_button"
        onClick={
            () => {
                props.editorRef.saveSchema()
            }
        }
    >
        <IoIosSave /> Save
    </span>
}


export default SaveButton