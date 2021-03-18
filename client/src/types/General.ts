import React from "react";
import {Page} from "./APIResponses";


export type PageComponentProps = {
    data: Page
}

export type PageComponent = React.FunctionComponent<PageComponentProps>;

