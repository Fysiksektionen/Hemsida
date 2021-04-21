import React, { useState } from 'react';
import { Locale, LocaleContext, locales } from './contexts';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import { Site } from './types/api_object_types';
import Admin from './components/admin/Admin';
import PageTypeLoader from './components/PageTypeLoader';
import APIDocs from './pages/APIDocs/APIDocs';
import './App.css';

// Import fake data
import { mockSiteResp } from './mock_data/mock_site_response';
import { Container, Row } from 'react-bootstrap';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);

    // TODO: Replace by server call to /api/site/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [siteData, setSiteData] = useState<Site>(mockSiteResp.data);

    return (
        <Container fluid className="App">
            <LocaleContext.Provider value={locale}>
                <Switch>
                    <Route path="/admin">
                        <Row>
                            <Admin />
                        </Row>
                    </Route>
                    <Route path="/api-docs">
                        <Row>
                            <APIDocs />
                        </Row>
                    </Route>
                    <Route>
                        {siteData &&
                            <Row>
                                <Header content={
                                    locale === locales.sv
                                        ? siteData.headerContentSv
                                        : siteData.headerContentEn
                                } setLocale={setLocale} />
                            </Row>
                        }
                        <Row className="content">
                            <PageTypeLoader />
                        </Row>
                        {siteData &&
                            <Row>
                                <Footer content={
                                    locale === locales.sv
                                        ? siteData.footerContentSv
                                        : siteData.footerContentEn
                                } />
                            </Row>
                        }
                    </Route>

                </Switch>
            </LocaleContext.Provider>
        </Container>
    );
}

export default App;
