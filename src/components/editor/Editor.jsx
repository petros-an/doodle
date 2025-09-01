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


function findTypesFromState(state) {
    const tree = syntaxTree(state)
    return analyzeTypes(
        tree,
        (from, to) => state.doc.sliceString(from, to)
    )
}


function Editor(props) {


    const [value, _] = React.useState(
        "x -> {\n" +
        "  \"a\": \"b\"\n" +
        "}"
    );


    const onChange = (text, update) => {
        const typesList = findTypesFromState(update.state)
        console.log(typesList)
        props.onTypesListChange(typesList)
    }

    props.ref.renameHandler = (typeName, value) => {
        const tree = syntaxTree(props.ref.view.state)
        const view = props.ref.view
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

    props.ref.extractSchema = schema => {
        // console.log(schema)
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


    return <>
        <CodeMirror
            theme={customTheme}
            value={value}
            height="70vh"
            width="33vw"
            extensions={
                [
                    JSLLanguageSupport,
                    JSLSyntaxHighlighting,
                    syntaxLinter,
                    typesLinter,
                    JSLAutocompletion,
                    makeUpdateListener(props.onExtractSchemaFound)
                ]
            }
            onChange={onChange}
            onCreateEditor={
                view => {
                    props.ref.view = view
                }
            }
        />

    </>
}
export default Editor;