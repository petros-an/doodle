import React from "react";
import "./typeDetail.css"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";

function TypeDetail(props) {
    const [state, setState] = React.useState({
        isOpened: false,
        renameText: props.type.name || ""
    })

    return <div
        className="typeDetail"
    >
        <span className="typeDetailTitle">
            {props.type.name} : {props.type.type}
        </span>

        {
            !state.isOpened &&
            <IoIosArrowDropdown
                onClick={
                    () => setState({
                        isOpened: true,
                        renameText: props.type.name
                    })
                }
            />
        }

        {
            state.isOpened &&
            <IoIosArrowDropup
                onClick={
                    () => setState({
                        isOpened: false,
                        renameText: props.type.name
                    })
                }
            />
        }

        {
            state.isOpened &&
            <div className="typeDetailContent">
                <input
                    className="typeDetailRename"
                    type="text"
                    value={state.renameText}
                    onChange={
                        (event) => setState({
                            renameText: event.target.value,
                            isOpened: state.isOpened
                        })
                    }
                />

                <button
                    onClick={
                        () => {
                            props.onRenameClick(props.type.name, state.renameText)
                        }
                    }
                >
                    Rename
                </button>
            </div>
        }
    </div>
}

export default TypeDetail;