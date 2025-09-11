import React from "react";
import "./typeDetail.css"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io";
import {FaRegArrowAltCircleRight} from "react-icons/fa";

function TypeDetail(props) {
    const [state, setState] = React.useState({
        isOpened: false,
        renameText: props.type.name || ""
    })

    return <div
        className="typeDetail"

    >
        <span
            className="typeDetailTitle"
            onClick={
                () => setState({
                    isOpened: !state.isOpened,
                    renameText: props.type.name
                })
            }
        >
            {props.type.name} : {props.type.type}
        </span>

        {
            state.isOpened &&
            <div className="typeDetailContent">
                <input
                    size={4}
                    className="typeDetailRename"
                    type="text"
                    value={"rename"}
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
                    {"->"}
                </button>
            </div>
        }
    </div>
}

export default TypeDetail;