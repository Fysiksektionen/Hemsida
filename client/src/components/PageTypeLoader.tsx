import { useLocation } from "react-router-dom";
import pageTypeMap from "../pages/PageTypeMap";
import PageNotFound from "../pages/PageNotFound";

// Fake data import, to be removed.
import {DummyData2} from './news/FrontpageNewsWidget';


export default function PageTypeLoader() {
    let location = useLocation();

    // Call /api/resolve-url?path=<path>
    // const res = callAPI("/resolve-url", GET={path: params.path})
    // Fake for now...
    let res: RespType;
    if(location.pathname in pathToResp) {
        res = pathToResp[location.pathname];
    } else {
        res = emptyResp;
    }
    // End of fake

    // If defined in page_type <-> Component map, render page. Else give page-not found.
    if(res.data.page_type in pageTypeMap) {
        return (
            <div id="dynamic_page_content">
                {pageTypeMap[res.data.page_type](res.data)}
            </div>
        );
    } else {
        return <PageNotFound />;
    }
}


// Everything below here is fake-data
export type PageData = {
    page_type: string,
    content?: object
}

export type RespType = {
    code: number,
    data: PageData
};

const styretPageResp: RespType = {
    code: 200,
    data: {
        page_type: "styret",
        // And a lot more information about the page
    }
};

const fronpageResp: RespType = {
    code: 200,
    data: {
        page_type: "start",
        // And a lot more information about the page
    }
};

const newspageResp: RespType = {
    code: 200,
    data: {
        page_type: "news_article",
        content: DummyData2
        // And a lot more information about the page
    }
};

const emptyResp: RespType = {
    code: 200,
    data: {
        page_type: ""
        // And a lot more information about the page
    }
};

const pathToResp: { [key: string]: RespType } = {
    "/styret": styretPageResp,
    "/": fronpageResp,
    "/start": fronpageResp,
    "/newsarticle": newspageResp
};