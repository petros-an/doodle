import {HighlightStyle, syntaxHighlighting} from "@codemirror/language";
import {tags} from "@lezer/highlight";

const highlightStyle = HighlightStyle.define([
    {tag: tags.keyword, color: "#52b"},
    {tag: tags.operator, color: "#b58"},
    {tag: tags.name, color: "#000"},
    {tag: tags.literal, color: "#060"},
    {tag: tags.variableName, color: "#000"},
    {tag: tags.atom, color: "#050"},
    {tag: tags.comment, color: "#888"},
    {tag: tags.number, color: "#58F"},
    {tag: tags.bool, color: "#FA1"},
])


const JSLSyntaxHighlighting = syntaxHighlighting(highlightStyle)

export default JSLSyntaxHighlighting