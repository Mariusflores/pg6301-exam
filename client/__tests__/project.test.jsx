import React from "react";

import {render} from "react-dom";
import {FrontPage} from "../pages/frontPage";
import {OtherPage} from "../pages/otherPage";

describe("project", () => {
    it('shows other page', () => {
        const element = document.createElement("div");
        render(<FrontPage/>, element)

        expect(element.querySelector("h1").innerHTML)
            .toEqual("Welcome to Kristiania Catering!");
        expect(element.innerHTML).toMatchSnapshot();
    });

});




