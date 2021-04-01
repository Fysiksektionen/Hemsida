import React, { useState } from 'react';
import { ContentObject, Page } from '../../../types/api_object_types';
import callApi from '../call_api_temp';
import { Button, Row, Col } from 'react-bootstrap';
import PageNotFound from '../../../pages/PageNotFound';
import {
    ContentTreeContext,
    EditorialModeContext,
    LocaleContext,
    locales,
    useCTReducer
} from '../../../contexts';
import PageTypeLoader from '../../PageTypeLoader';
import Header from '../../Header';
import Footer from '../../Footer';
import { mockSiteResp } from '../../../mock_data/mock_site_response';
import { emptyPage } from '../../../mock_data/pages/mock_PageTypeLoader';
import LocaleSelector from '../../LocaleSelector';

type PageEditorProps = {
    setPagesLocation: (props: NodeJS.Dict<string>) => void;
    id: string,
    page?: Page,
}

/**
 * Editor component for a single page. Puts the page in editorial mode and has a menu to change non-content values.
 * @param setPagesLocation: Hook to navigate within the Pages admin-app.
 * @param id: Id of the page. Currently as string.
 * @param page: The page object. Can be passed if already fetched.
 */
export default function PageEditor({ setPagesLocation, id, page }: PageEditorProps) {
    // If we dont have page data, get page (mock data for now)
    if (page === undefined) {
        page = emptyPage;
        const resp = callApi({ path: 'pages/' + id + '/', getParams: {} });
        if (resp.code === 200) {
            page = resp.data;
        }
    }

    // Local context for editing
    const [pageLocale, setPageLocale] = useState(locales.sv);
    // State of the saved data (that should have been sent to server).
    const [pageData, setPageData] = useState({ page: page as Page, hasChanged: false });

    // Use the CTReducer to allow for child components to update the content tree.
    // Use this state when passing down content to children.
    // Alter postDispatchHook so that any updates to tree triggers an hasChanged=True state change.
    const [content, dispatch] = useCTReducer({
        content: pageLocale === locales.sv ? pageData.page?.contentSv : pageData.page?.contentEn,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        postDispatchHook: () => {
            setPageData({ ...pageData, hasChanged: true });
        }
    });

    // Save the current content to the "saved" pageData state.
    // TODO: Upload to server in this hook.
    function saveContent() {
        pageLocale === locales.sv
            ? setPageData({
                page: { ...pageData.page, contentSv: content as ContentObject },
                hasChanged: false
            })
            : setPageData({
                page: { ...pageData.page, contentEn: content as ContentObject },
                hasChanged: false
            });
    }

    // Send page with updated content down for rendering in children.
    const pageWithNewContent = page !== undefined ? { ...pageData.page } : { ...emptyPage };
    if (pageLocale === locales.sv) {
        pageWithNewContent.contentSv = content;
    } else {
        pageWithNewContent.contentEn = content;
    }

    return page !== undefined
        ? (
            <Col>
                <Row className='px-4 pt-4 mb-3'>
                    <a href='#' onClick={() => setPagesLocation({})}><i className='fa fa-angle-left'/> Tillbaka</a>
                </Row>
                <Row className='d-flex justify-content-between border-bottom border-dark px-5 pb-3'>
                    <h2 className='m-0 col'>Redigera sida: {page.name}</h2>
                    <Col xs={3}>
                        <Row className='justify-content-end'>
                            <LocaleSelector localeState={pageLocale} setLocaleHook={setPageLocale}/>
                            <Button variant='primary' onClick={saveContent} disabled={!pageData.hasChanged}>
                                <i className="fas fa-save" /> Save
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className={'px-0'}>
                        <LocaleContext.Provider value={pageLocale}>
                            <Header content={
                                pageLocale === locales.sv
                                    ? mockSiteResp.data.headerContentSv
                                    : mockSiteResp.data.headerContentEn
                            } setLocale={() => {}} />
                            <EditorialModeContext.Provider value={true}>
                                <ContentTreeContext.Provider value={dispatch}>
                                    <PageTypeLoader page={pageWithNewContent} />
                                </ContentTreeContext.Provider>
                            </EditorialModeContext.Provider>
                            <Footer content={
                                pageLocale === locales.sv
                                    ? mockSiteResp.data.footerContentSv
                                    : mockSiteResp.data.footerContentEn
                            }/>
                        </LocaleContext.Provider>
                    </Col>
                </Row>
            </Col>
        )
        : <PageNotFound />;
}
