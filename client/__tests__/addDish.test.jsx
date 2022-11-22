import {MemoryRouter} from "react-router-dom";
import {AddDish} from "../pages/addDish";
import * as React from "react";
import ReactDOM from "react-dom";


describe('add dish component', () =>{
    it('Shows dish form', () =>  {
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <AddDish/>
            </MemoryRouter>,
            element
        );
        expect(element.innerHTML).toMatchSnapshot();
    });
})