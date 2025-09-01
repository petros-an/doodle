import React from "react";
import "./typeDetailsContainer.css"
import TypeDetail from "../typeDetail/typeDetail.jsx";

function TypeDetailContainer(props) {
    return <div id="results_wrapper">
        {
            props.types.map(
                (type, i) => (
                    <TypeDetail
                        key={i}
                        type={type}
                        onClick={props.onResultTypeClick}
                        onRenameClick={props.onRenameClick}
                    />
                )
            )
        }
    </div>

}

export default TypeDetailContainer;