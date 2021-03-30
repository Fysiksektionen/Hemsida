import React from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
import { Page } from '../types/api_object_types';

// Import fake data
import { emptyResp, pathToResp } from '../mock_data/pages/mock_PageTypeLoader';
import { APIResponse } from '../types/general';
import { LocaleContext, locales } from '../contexts';
import { frontpage } from '../mock_data/pages/1_frontpage';

type PageTypeLoaderProps = {
    page?: Page
}

/**
 * Component loading correct component depending on current URL.
 *
 * @returns {JSX} Div containing correct component for URL or PageNotFound
 *  component if no matching component was found.
 */
export default function PageTypeLoader({ page } : PageTypeLoaderProps) {
    const location = useLocation();

    if (page === undefined) {
        // Call /api/resolve-url?path=<path>
        // const res = callAPI("/resolve-url", GET={path: params.path})
        // Fake for now...
        let res: APIResponse<Page>;
        if (location.pathname in pathToResp) {
            res = pathToResp[location.pathname];
        } else {
            res = emptyResp;
        }
        page = res.data;
        // End of fake
    }

    // If defined in pageTypeMap, render page. Else give PageNotFound.
    if (page.pageType in pageTypeMap) {
        return (
            <LocaleContext.Consumer>
                {locale =>
                    <div id="dynamic_page_content">
                        {
                            page !== undefined
                                ? pageTypeMap[page.pageType]((locale === locales.sv ? page.contentSv : page.contentEn))
                                : <></>
                        }
                    </div>
                }
            </LocaleContext.Consumer>
        );
    } else {
        return <PageNotFound />;
    }
}
