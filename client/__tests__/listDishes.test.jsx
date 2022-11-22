import {ListDishes, FetchJson} from "../pages/listDishes";
import * as  React from "react";
import ReactDOM from "react-dom";

describe("ListDishes component", () =>{

    it('shows loading screen ',
        () => {
            const domElement = document.createElement("div");
            ReactDOM.render(<ListDishes/>, domElement);
            expect(domElement.innerHTML).toMatchSnapshot();
        });

})