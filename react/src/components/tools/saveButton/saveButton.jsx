import './saveButton.css'
import {IoIosSave} from "react-icons/io";
import React from "react";
import {FaCheckSquare} from "react-icons/fa";

function SaveButton(props) {
    const [state, setState] = React.useState({
        isSaved: false
    })
    return <span
        id="save_button"
        onClick={
            () => {
                props.editorRef.saveSchema()
                setState(
                    state => {
                        return {
                            ...state,
                            isSaved: true
                        }
                    }
                )
                setTimeout(
                    () => {
                        setState(
                            state => {
                                return {
                                    ...state,
                                    isSaved: false
                                }
                            }
                        )
                    },
                    1000
                )

            }
        }
    >
        <IoIosSave /> Save
        {
            state.isSaved &&
                <FaCheckSquare/>

        }
    </span>
}


export default SaveButton