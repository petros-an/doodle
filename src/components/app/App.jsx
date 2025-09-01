import React from 'react';
import './App.css'
import Editor from "../editor/Editor.jsx";
import TypeDetailContainer from "../typeDetails/typeDetailsContainer/typeDetailContainer.jsx";
import Tools from "../tools/tools.jsx";



function App() {

    const [state, setState] = React.useState({
        types: [],
        extractSchema: null,
    })

    // console.log(state)

    const editorRef = React.useRef(null);

    return <>
        <h1 id="title">Petros' schema editor</h1>
        <div id="app">



            <div id="editor_wrapper">
                <Editor
                    onTypesListChange={
                        (typesList) => {
                            setState({
                                types: typesList,
                                extractSchema: state.extractSchema
                            })
                        }
                    }
                    onExtractSchemaFound={
                        (schema) => {
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
                    }

                    ref={editorRef}
                />
            </div>

            <TypeDetailContainer
                types={state.types}

                onRenameClick={
                    (typeName, renameText) => {
                        editorRef.renameHandler(typeName, renameText)
                    }
                }
            />

            <Tools
                extractSchema={state.extractSchema}
                editorRef={editorRef}
            />

        </div>

    </>
}

export default App;