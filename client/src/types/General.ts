import React from "react";
import {Page} from "./APIResponses";


export type PageComponentProp = {
    data: Page
}

export type PageComponent = React.FunctionComponent<PageComponentProp>;

