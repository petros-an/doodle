import React, {useEffect} from 'react';
import './readonly.css'
import {useParams} from "react-router-dom";
import DoodleService from "../../services/doodle.js";
import customTheme from "../../editor/themes/main.js";
import JSLLanguageSupport from "../../language/jsl.js";
import JSLSyntaxHighlighting from "../../editor/highlighting/highlighting.js";
import {EditorView} from "@codemirror/view";
import CodeMirror from '@uiw/react-codemirror';

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

    return <>
        <CodeMirror
            theme={customTheme}
            value={text}
            extensions={
                [
                    JSLLanguageSupport,
                    JSLSyntaxHighlighting,
                    EditorView.editable.of(false),
                ]
            }
        />


    </>


}

export default Readonly;