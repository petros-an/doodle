import React from 'react';
import './App.css'
import Editor from "../editor/Editor.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../about/about.jsx";


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0; // random 0-15
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // version 4 & variant
        return v.toString(16);
    });
}

function App() {

    let doodleId = localStorage.getItem("currentDoodleId")
    if (!doodleId) {
        doodleId = generateUUID()
        localStorage.setItem("currentDoodleId", doodleId)
    }

    return <>
        <h1
            id="title"
        >
            <u>
                Petros' JSON doodling editor
            </u>
        </h1>
        <div id="app">


            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route
                    path="/editor/:doodleId"
                    element={<Editor/>}
                />
                <Route path="/" element={<Navigate to={`/editor/${doodleId}`}></Navigate>}/>




            </Routes>

        </div>

        <footer id={"footer"}>

        </footer>

    </>
}

export default App;