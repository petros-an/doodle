import React, {useEffect} from 'react';
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
import DoodleService from "../../services/doodle.js";

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

    const [state, setState] = React.useState(
        {
            text: '',
            loading: true,
            types: [],
            extractSchema: null,
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


    const editorRef = React.useRef(null);

    if (loading) {
        return <div>Loading...</div>
    }


    const onTypesListChange = (typesList) => {
        setState(
            prevState => {
                return {
                    ...prevState,
                    types: typesList,
                }
            }
        )
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
        editorRef.text = text
        const typesList = findTypesFromState(update.state)
        onTypesListChange(typesList)
    }

    editorRef.renameHandler = (typeName, value) => rename(editorRef, typeName, value)

    editorRef.extractSchema = (schema) => extractSchema(editorRef, schema)

    editorRef.saveSchema = () => {
        DoodleService.save(doodleId, editorRef.text).then(
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
    }

    return <>
        <div id={"fuckme"}>
            <span id={"editor_wrapper"}>
                <CodeMirror
                    theme={customTheme}
                    value={text}
                    height="82vh"
                    width="65vw"
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
                            editorRef.text = text
                            const typesList = findTypesFromState(view.state)
                            onTypesListChange(typesList)
                        }
                    }
                />

            </span>
            <TypeDetailContainer
                types={state.types}

                onRenameClick={
                    (typeName, renameText) => {
                        editorRef.renameHandler(typeName, renameText)
                    }
                }
            />
        </div>
        <Tools
            doodleId={doodleId}
            extractSchema={state.extractSchema}
            editorRef={editorRef}
        />
    </>
}
export default Editor;