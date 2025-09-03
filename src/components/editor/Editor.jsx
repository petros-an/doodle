import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import JSLLanguageSupport from "../../language/jsl.js";
import JSLAutocompletion from "../../editor/autocompletion/autocompletion.js";
import JSLSyntaxHighlighting from "../../editor/highlighting/highlighting.js";
import syntaxLinter from "../../editor/linters/syntax.js";
import typesLinter from "../../editor/linters/types.js";
import customTheme from "../../editor/themes/main.js";
import {syntaxTree} from "@codemirror/language";
import analyzeTypes from "../../language/types.js";
import makeUpdateListener from "../../editor/listeners/updateListener.js";
import './editor.css'
import TypeDetailContainer from "../typeDetails/typeDetailsContainer/typeDetailContainer.jsx";
import Tools from "../tools/tools.jsx";
import {useParams} from "react-router-dom";

function findTypesFromState(state) {
    const tree = syntaxTree(state)
    return analyzeTypes(
        tree,
        (from, to) => state.doc.sliceString(from, to)
    )
}

function rename(editorRef, typeName, value) {
    const tree = syntaxTree(editorRef.view.state)
    const view = editorRef.view
    tree.iterate({
        enter: (node) => {
            if (node.name === "TypeDef") {
                let c = node.node.cursor()
                c.firstChild()
                const newIdentifierName = view.state.doc.sliceString(c.from, c.to)
                if (newIdentifierName == typeName) {
                    view.dispatch({
                        changes: {
                            from: c.from,
                            insert: value,
                            to: c.to,
                        },
                    });
                }
            }

            if (node.name === 'TypeExpr') {
                let c = node.node.cursor()
                c.firstChild()
                if (c.name === 'Identifier') {
                    let newIdentifierType = view.state.doc.sliceString(c.from, c.to)
                    if (newIdentifierType == typeName) {
                        view.dispatch({
                            changes: {
                                from: c.from,
                                insert: value,
                                to: c.to,
                            },
                        });
                    }
                }

            }
        }
    })

}

function extractSchema(editorRef, schema) {
    const extractedText = schema.view.state.doc.sliceString(schema.from, schema.to)

    const newTypeName = 'newType'

    const newTypeText = newTypeName + ' -> ' + extractedText + '\n'

    schema.view.dispatch({
        changes: {
            from: 0,
            insert: newTypeText
        },
    });

    schema.view.dispatch({
        changes: {
            from: schema.from + newTypeText.length,
            to: schema.to + newTypeText.length,
            insert: newTypeName,
        },
    });

}


function Editor() {

    const [value, _] = React.useState(
        "x -> {\n" +
        "  \"a\": \"b\"\n" +
        "}"
    );

    // const {doodleId} = useParams()


    const [state, setState] = React.useState({
        types: [],
        extractSchema: null,
    })


    const editorRef = React.useRef(null);

    const onTypesListChange = (typesList) => {
        setState({
            types: typesList,
            extractSchema: state.extractSchema
        })
    }

    const onExtractSchemaFound = (schema) => {
        setState(
            prevState => {
                return {
                    ...prevState,
                    extractSchema: schema,
                    types: prevState.types
                }
            }
        )
    }


    const onEditorChange = (text, update) => {
        const typesList = findTypesFromState(update.state)
        onTypesListChange(typesList)
    }

    editorRef.renameHandler = (typeName, value) => rename(editorRef, typeName, value)

    editorRef.extractSchema = (schema) =>extractSchema(editorRef, schema)


    return <>
        <div id={"editor_wrapper"}>
            <CodeMirror
                theme={customTheme}
                value={value}
                height="70vh"
                width="45vw"
                extensions={
                    [
                        JSLLanguageSupport,
                        JSLSyntaxHighlighting,
                        syntaxLinter,
                        typesLinter,
                        JSLAutocompletion,
                        makeUpdateListener(onExtractSchemaFound)
                    ]
                }
                onChange={onEditorChange}
                onCreateEditor={
                    view => {
                        editorRef.view = view
                    }
                }
            />

        </div>
        <TypeDetailContainer
            types={state.types}

            onRenameClick={
                (typeName, renameText) => {
                    editorRef.renameHandler(typeName, renameText)
                }
            }
        />

        <Tools
            extractSchema={state.extractSchema}
            editorRef={editorRef}
        />
    </>
}
export default Editor;