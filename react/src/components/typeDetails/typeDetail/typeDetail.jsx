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
        className={`typeDetail`}
        onMouseEnter={
            () => {
                props.editorRef.selectText(
                    props.type.from, props.type.to
                )
            }
        }
        onMouseLeave={
            () => {
                props.editorRef.clearSelection()
            }
        }
        onClick={
            (e) => {
                if (
                    e.target.className === 'typeDetailRename'
                    ||
                    e.target.className === 'typeDetailRenameButton'
                ) {
                    return
                }
                setState({
                    isOpened: !state.isOpened,
                    renameText: props.type.name
                })

            }
        }
    >
        <span
            className={"typeDetailTitle"}

        >
            {/*<span>{props.type.name} : </span>*/}
            {<span
                className={`t-${props.type.type}`}
            >
                {props.type.name}
            </span>}
        </span>

        {
            state.isOpened &&
            <div className="typeDetailContent">
                <input
                    size={10}
                    className="typeDetailRename"
                    type="text"
                    value={state.renameText === null ? "rename" : state.renameText}
                    onChange={
                        (event) => setState({
                            renameText: event.target.value,
                            isOpened: state.isOpened
                        })
                    }
                />

                <button
                    className={"typeDetailRenameButton"}
                    onClick={
                        (e) => {
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