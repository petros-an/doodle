import {parser} from "./parser.mjs";
import {styleTags, tags as t} from "@lezer/highlight";
import {LRLanguage, indentNodeProp, foldInside, foldNodeProp} from "@codemirror/language";
import {LanguageSupport} from "@codemirror/language"

let jslParser = parser.configure({
    props: [
        styleTags({
            ARROW: t.operator,
            Enum: t.keyword,
            FAKLITERAL: t.atom,
            Identifier: t.name,
            Int: t.keyword,
            Bool: t.keyword,
            Float: t.keyword,
            Fak: t.keyword,
            UUID: t.keyword,
            PIPE: t.operator,
            Comment: t.comment,
            IntLiteral: t.number,
            FloatLiteral: t.number,
            BoolLiteral: t.bool,
        }),
        indentNodeProp.add({
            SchemaExpr: function (context) {
                return context.baseIndent + context.unit
            },
            EnumExpr: function (context) {
                return context.baseIndent + context.unit
            },
        }),
        foldNodeProp.add({
            JSL: foldInside,
            SchemaExpr: foldInside,
        })
    ]
})

export const jsl = LRLanguage.define({
    parser: jslParser,
})

const JSLLanguageSupport = new LanguageSupport(jsl)

export default JSLLanguageSupport