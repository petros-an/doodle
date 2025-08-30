import React from 'react';
import './App.css'
import Editor from "../editor/Editor.jsx";



function App() {

    return <>
        <h1 id="title">Petros' schema doodler</h1>

        <div id="editor_wrapper">

            <Editor/>

        </div>
    </>
}
export default App;