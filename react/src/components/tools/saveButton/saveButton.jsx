import './saveButton.css'
import {IoIosSave} from "react-icons/io";
import React from "react";
import {FaCheckSquare, FaSpinner} from "react-icons/fa";

function SaveButton(props) {
    const [state, setState] = React.useState({
        isSaved: false,
        loading: false
    })
    return <span
        id="save_button"
        className={"tool_button"}
        onClick={
            async () => {
                setState(
                    state => {
                        return {
                            ...state,
                            loading: true
                        }
                    }
                )
                props.editorRef.saveSchema()
                setState(
                    state => {
                        return {
                            ...state,
                            isSaved: true,
                            loading: false
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
            state.loading && <FaSpinner/>

        }
        {
            state.isSaved &&
                <FaCheckSquare/>

        }
    </span>
}


export default SaveButton