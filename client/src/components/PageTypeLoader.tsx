import React from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';

// Fake data import, to be removed.
import { DummyData2 } from './news/FrontpageNewsWidget';

// Fake-data
export type PageData = {
    pageType: string,
    content?: object
    // And a lot more information about the page
}

type RespType = {
    code: number,
    data: PageData
};

const styretPageResp: RespType = {
    code: 200,
    data: {
        pageType: 'styret'
    }
};

const newspageResp: RespType = {
    code: 200,
    data: {
        pageType: 'news_article',
        content: DummyData2
    }
};

const emptyResp: RespType = {
    code: 200,
    data: {
        pageType: ''
    }
};

const pathToResp: { [key: string]: RespType } = {
    '/styret': styretPageResp,
    '/newsarticle': newspageResp
};
// End of fake data

export default function PageTypeLoader() {
    /**
     * Component loading correct component depending on current URL.
     *
     * @returns {JSX} Div containing correct component for URL or PageNotFound
     *  component if no matching component was found.
     */

    const location = useLocation();

    // Call /api/resolve-url?path=<path>
    // const res = callAPI("/resolve-url", GET={path: params.path})
    // Fake for now...
    let res: RespType;
    if (location.pathname in pathToResp) {
        res = pathToResp[location.pathname];
    } else {
        res = emptyResp;
    }
    // End of fake

    // If defined in pageTypeMap, render page. Else give PageNotFound.
    if (res.data.pageType in pageTypeMap) {
        return (
            <div id="dynamic_page_content">
                {pageTypeMap[res.data.pageType](res.data)}
            </div>
        );
    } else {
        return <PageNotFound />;
    }
}
