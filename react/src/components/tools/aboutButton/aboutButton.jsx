import './aboutButton.css'
import { FcIdea } from "react-icons/fc";
import {FaInfoCircle} from "react-icons/fa";


function AboutButton(props) {
    return <span
        className={"tool_button"}
        id={"about_button"}
        onClick={
            () => {
                window.location.href = "/about"
            }
        }
    >
        <FaInfoCircle /> About
    </span>
}

export default AboutButton
