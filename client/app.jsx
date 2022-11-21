import * as React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {OtherPage} from "./pages/otherPage";

function NavBar() {
    return <header id={"navbar"}>
        <div className={"link"}>
            <Link to={"/other"}> Other page</Link>
        </div>
        <div className={"link"}>
            <Link to={"/"}>Home page</Link>
        </div>

    </header>;
}

export function App() {
    return <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/other"} element={<OtherPage/>}/>
        </Routes>

    </BrowserRouter>;
}