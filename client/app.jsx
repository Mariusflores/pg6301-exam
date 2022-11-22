import * as React from "react";

import {FrontPage} from "./pages/frontPage";
import {MenuPage} from "./pages/menu";
import {LoginPage} from "./pages/loginPage";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

function NavBar() {
    return <header id={"navbar"}>
        <div className={"link"}>
            <Link to={"/menu"}> Menu </Link>
        </div>
        <div className={"link"}>
            <Link to={"/"}>Home page</Link>
        </div>
        <div className={"link"}>
            <Link to={"/login"}>Login</Link>
        </div>



    </header>;
}

export function App() {
    return <Router>
        <NavBar/>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/menu"} element={<MenuPage/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"*"} element={<h1>This is not the page you are looking for</h1>}/>

        </Routes>

    </Router>;
}