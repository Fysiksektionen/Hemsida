import React from "react";
import {Page} from "./api_responses";


export type PageComponentProps = {
    data: Page
}

export type PageComponent = React.FunctionComponent<PageComponentProps>;

