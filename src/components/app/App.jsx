import React from 'react';
import './App.css'
import Editor from "../editor/Editor.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../about/about.jsx";



function App() {

    const doodleId = crypto.randomUUID();

    return <>
        <h1 id="title">
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

    </>
}

export default App;