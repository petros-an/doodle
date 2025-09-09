import {linter} from "@codemirror/lint";
import {syntaxTree} from "@codemirror/language";


const syntaxLinter = linter(view => {
    let diagnostics= []
    syntaxTree(view.state).cursor().iterate(node => {
        if (view.state.doc.text.length === 0) {
            return
        }
        if (view.state.doc.text[0] === '') {
            return
        }
        if (node.name === "⚠") {diagnostics.push({
            from: node.from,
            to: node.to,
            severity: "error",
            message: "Invalid syntax",
            actions: [{
                name: "Remove",
                apply(view, from, to) { view.dispatch({changes: {from, to}}) }
            }]
        })}
    })
    return diagnostics
})

export default syntaxLinter