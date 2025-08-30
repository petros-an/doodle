import {createTheme} from "@uiw/codemirror-themes";


const mainTheme = createTheme({
    theme: 'dark',
    settings: {
        background: '#e8fffe',
        foreground: '#000',
        caret: '#000',
        selection: '#036dd626',
        selectionMatch: '#036dd626',
        lineHighlight: '#8a91991a',
        gutterBackground: '#fffffff',
        fontSize: '13pt',
    },

});

export default mainTheme
