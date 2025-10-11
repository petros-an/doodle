import React, {useEffect} from 'react';
import './readonly.css'
import {useParams} from "react-router-dom";
import DoodleService from "../../services/doodle.js";
import customTheme from "../../editor/themes/main.js";
import JSLLanguageSupport from "../../language/jsl.js";
import JSLSyntaxHighlighting from "../../editor/highlighting/highlighting.js";
import {EditorView} from "@codemirror/view";
import CodeMirror from '@uiw/react-codemirror';
import {FaExternalLinkAlt} from "react-icons/fa";

function Readonly() {
    const [state, setState] = React.useState(
        {
            text: '',
            loading: true,
        }
    );

    const {doodleId} = useParams()

    const {text, loading} = state

    useEffect(() => {
        DoodleService.getOrCreate(doodleId).then(
            (doodle) => {
                setState(
                    prevState => {
                        return {
                            ...prevState,
                            loading: false,
                            text: doodle.text,
                        }
                    }
                )
            }
        )

    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return <div id={"readonly_container"}>
        <CodeMirror
            theme={customTheme}
            value={text}
            height="100vh"
            width="100vw"
            extensions={
                [
                    JSLLanguageSupport,
                    JSLSyntaxHighlighting,
                    EditorView.editable.of(false),
                ]
            }
        />
        <div id={"readonly_footer"}>
            {/*<h3>TEST</h3>*/}
            <strong>
                Created with

                <a
                    href={`https://petros-an.com/editor/${doodleId}`}
                    target="_top"
                >
                    {" JSONDoodle "}
                    <FaExternalLinkAlt />
                </a>
            </strong>
        </div>

    </div>


}

export default Readonly;