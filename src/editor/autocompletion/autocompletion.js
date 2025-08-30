import {syntaxTree} from "@codemirror/language";
import {autocompletion} from "@codemirror/autocomplete";


const typesAutocompletion = context => {
    let tree = syntaxTree(context.state)
    let identifiers = []
    tree.iterate({
        enter: (node) => {

            if (node.name === 'TypeDef') {
                let c = node.node.cursor()
                c.firstChild()
                const newIdentifierName = context.state.doc.sliceString(c.from, c.to)
                identifiers.push(newIdentifierName)
            }

        }
    })
    let identifierOptions = identifiers.map((identifier) => {
        return {
            label: identifier,
            type: "type"
        }
    })

    let keywordOptions =
            [
                "int",
                "float",
                "bool",
                "Enum",
                "UUID",

            ].map((keyword) => {
                return {
                    label: keyword,
                    type: "keyword"
                }
            })


    let allOptions = identifierOptions.concat(keywordOptions)


    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;
    return {
        from: word.from,
        options: allOptions,
        validFor: /^\w*$/
    };
}


const editorAutocompletion = autocompletion({override: [typesAutocompletion]})

export default editorAutocompletion;