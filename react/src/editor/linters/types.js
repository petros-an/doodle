import {linter} from "@codemirror/lint";
import {syntaxTree} from "@codemirror/language";


const typesLinter = linter(
    view => {
        let state = view.state
        let diagnostics = []
        let types = {}
        let tree = syntaxTree(view.state)
        tree.iterate({
            enter: (node) => {
                if (node.name === 'TypeExpr') {
                    let c = node.node.cursor()
                    c.firstChild()
                    if (c.name === 'Identifier') {
                        let newIdentifierType = state.doc.sliceString(c.from, c.to)
                        if (!types[newIdentifierType]) {
                            let start = c.from
                            let end = c.to
                            diagnostics.push({
                                from: start,
                                to: end,
                                severity: "error",
                                "message": "Unknown type: " + newIdentifierType,
                            });
                        }

                    }


                }

                if (node.name === 'TypeDef') {
                    let c = node.node.cursor()
                    c.firstChild()
                    const newIdentifierName = state.doc.sliceString(c.from, c.to)

                    if (types[newIdentifierName]) {
                        diagnostics.push({
                            from: c.from,
                            to: c.to,
                            severity: "error",
                            "message": "Redefinition: " + newIdentifierName,
                        });
                    }

                    c.nextSibling()
                    c.nextSibling()

                    c.firstChild()
                    let newIdentifierType;
                    if (c.name === 'Identifier') {
                        newIdentifierType = state.doc.sliceString(c.from, c.to)
                    } else if (c.name === 'Primitive') {
                        newIdentifierType = state.doc.sliceString(c.from, c.to)
                    } else if (c.name === 'Enum') {
                        newIdentifierType = 'Enum'
                    } else if (c.name === 'SchemaExpr') {
                        newIdentifierType = 'Schema'
                    } else if (c.name === '⚠'){
                        return
                    } else if (c.name === 'EnumExpr') {
                        newIdentifierType = 'Enum'
                    } else if (c.name === 'ListExpr') {
                        newIdentifierType = 'List'
                    } else if (
                        c.name === "FAKLITERAL"
                        || c.name === "IntLiteral"
                        || c.name === "FloatLiteral"
                        || c.name === "BoolLiteral"
                    ) {
                        newIdentifierType = "literal"
                    } else {
                        throw new Error('Unknown type' + c.name)
                    }
                    types[newIdentifierName] = newIdentifierType
                }

            }
        })

        return diagnostics
    }
)

export default typesLinter