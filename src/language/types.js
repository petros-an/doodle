function analyzeTypes(tree, getText) {
    const typesMap = {}

    tree.iterate({
        enter: (node) => {
            if (node.name === 'TypeDef') {
                let c = node.node.cursor()
                c.firstChild()
                const newIdentifierName = getText(c.from, c.to)

                c.nextSibling()
                c.nextSibling()

                c.firstChild()
                let newIdentifierType;
                if (c.name === 'Identifier') {
                    newIdentifierType = getText(c.from, c.to)
                } else if (c.name === 'Primitive') {
                    newIdentifierType = getText(c.from, c.to)
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
                typesMap[newIdentifierName] = newIdentifierType
            }
        }
    })

    return Object.keys(typesMap).map(
        key => (
            {
                name: key,
                type: typesMap[key]
            }
        )
    )
}


export default analyzeTypes