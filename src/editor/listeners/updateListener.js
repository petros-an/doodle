import {EditorView} from "@uiw/react-codemirror";
import {syntaxTree} from "@codemirror/language";
import Types from "../../language/types"


const makeUpdateListener = (onExtractSchemaFound) => {
    const onUpdate = (viewUpdate) => {
        if (viewUpdate.selectionSet) {
            const selection = viewUpdate.state.selection.main;
            const {from, to} = selection
            if (to == from) {
                onExtractSchemaFound(null)
            }
            const tree = syntaxTree(viewUpdate.state)
            const node = tree.resolveInner(from)
            if (node.name === "TypeDef" || node.name === "KeyVal") {
                const typeExpr = node.lastChild
                if (typeExpr.firstChild && typeExpr.firstChild.name === 'SchemaExpr') {
                    onExtractSchemaFound(
                        {
                            from: from,
                            to: to,
                            node: node,
                            view: viewUpdate.view,
                        }
                    )
                    return
                }
            }


        }
    }
    return EditorView.updateListener.of(onUpdate)
}

export default makeUpdateListener