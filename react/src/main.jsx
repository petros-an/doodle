import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './components/app/App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Readonly from "./components/readonly/readonly.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/readonly/:doodleId"} element={<Readonly/>}>

                </Route>

                <Route path={"*"} element={<App/>}></Route>

            </Routes>
            {/*<Readonly />*/}
        </BrowserRouter>
    </StrictMode>,
)
