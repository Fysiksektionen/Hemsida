import React, { useEffect, useState } from 'react';
import { Locale, LocaleContext, locales } from './contexts';
import Frontpage from './pages/Frontpage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import PageTypeLoader from './components/PageTypeLoader';
import Admin from './admin/Admin';

// End of fake data
import { mockSiteResp } from './mock_data/mock_site_response';
import { emptyPage } from './mock_data/mock_PageTypeLoader';
import { Site } from './types/api_object_types';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);
    const [siteData, setSiteData] = useState<Site>();

    useEffect(() => {
        // Fake start (replace by server call)
        const siteResp = mockSiteResp;
        // Fake end

        setSiteData(siteResp.data);
    }, []);

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>
                <Switch>
                    <Route path="/admin">
                        <Admin adminRootPath={'/admin/'}/>
                    </Route>
                    <Route>
                        {siteData
                            ? <Header
                                content={locale === locales.sv ? siteData.headerContentSv : siteData.headerContentEn}
                                setLocale={setLocale}
                            />
                            : <></>}
                        <div className="content container">
                            <Switch>
                                {/* Frontpage should maybe be included in the dynamic page loader,
                                    but left here for illustrative purposes of non-dynamic loading of
                                    components (i.e. login, admin, etc.). */}
                                <Route exact={true} path={['/', '/start', '/index', '/hem', '/home']}>
                                    <Frontpage {...emptyPage} />
                                </Route>
                                <Route component={PageTypeLoader}/>
                            </Switch>
                        </div>
                        {siteData
                            ? <Footer content={
                                locale === locales.sv
                                    ? siteData.footerContentSv
                                    : siteData.footerContentEn
                            } />
                            : <></>}
                    </Route>
                </Switch>
            </LocaleContext.Provider>
        </div>
    );
}

export default App;
