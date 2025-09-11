import './shareButton.css'
import { FcIdea } from "react-icons/fc";
import {FaCopy, FaShareAlt} from "react-icons/fa";
import React from "react";


function ShareButton(props) {
    const [state, setState] = React.useState(
        {
            open: false,
        }
    );
    const editable = `${window.location.origin}/editor/${props.doodleId}`
    const readonly = `${window.location.origin}/readonly/${props.doodleId}`
    return <>
        <span
            className={"tool_button"}
            id={"share_button"}
            onClick={
                () => {
                    setState(
                        state => {
                            return {
                                ...state,
                                open: !state.open
                            }
                        }
                    )
                }
            }
        >
            <FaShareAlt /> Share
        </span>
        {
            state.open && <div id={"share_content"}>
                <p>
                    <FaCopy className={"copy_button"} onClick={
                        () => {
                            navigator.clipboard.writeText(editable)
                        }
                    }/>
                    {editable}
                </p>
                <p>
                    <FaCopy className={"copy_button"} onClick={
                        () => {
                            navigator.clipboard.writeText(readonly)
                        }
                    }/>
                    {readonly}
                </p>
            </div>
        }

    </>
}

export default ShareButton
