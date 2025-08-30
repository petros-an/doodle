import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import JSLLanguageSupport from "../../language/jsl.js";
import editorAutocompletion from "../../editor/autocompletion/autocompletion.js";
import JSLSyntaxHighlighting from "../../editor/highlighting/highlighting.js";
import syntaxLinter from "../../editor/linters/syntax.js";
import typesLinter from "../../editor/linters/types.js";
import mainTheme from "../../editor/themes/main.js";



function Editor() {


    const [value, _] = React.useState("");


    const onChange = React.useCallback(
        ( ) => {},
        []
    );


    return <>
        <CodeMirror
            theme={mainTheme}
            value={value}
            height="600px"
            width="1000px"
            extensions={
                [
                    JSLLanguageSupport,
                    JSLSyntaxHighlighting,
                    syntaxLinter,
                    typesLinter,
                    editorAutocompletion
                ]
            }
            onChange={onChange}
        />

    </>
}
export default Editor;