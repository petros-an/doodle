import './newButton.css'
import { FcIdea } from "react-icons/fc";
import {FaInfoCircle} from "react-icons/fa";
import {FaCirclePlus} from "react-icons/fa6";


function NewButton(props) {
    return <span
        className={"tool_button"}
        id={"new_button"}
        onClick={
            () => {
                localStorage.removeItem("currentDoodleId")
                window.location.href = "/"
            }
        }
    >
        <FaCirclePlus /> New
    </span>
}

export default NewButton
