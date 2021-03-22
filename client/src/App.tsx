import React, { useState } from 'react';
import { Locale, LocaleContext, locales } from './contexts';
import Frontpage from './pages/Frontpage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import PageTypeLoader from './components/PageTypeLoader';

// Fake data for header and footer
import { mockSiteResp } from './mock_data/mock_App';
import { emptyPage } from './mock_data/mock_PageTypeLoader';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);

    // Do server call for Site-data. Faked for now.
    const siteData = mockSiteResp.data;

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>

                <Header
                    setLocale={setLocale}
                    contentSv={siteData.headerContentSv}
                    contentEn={siteData.headerContentEn}
                />

                <div className="content container">
                    <Switch>
                        {/* Frontpage should maybe be included in the dynamic page loader,
                            but left here for illustrative purposes of non-dynamic loading of
                            components (i.e. login, admin, etc.). */}
                        <Route exact={true} path={['/', '/start', '/index', '/hem', '/home']}>
                            <Frontpage pageType="start" />
                        </Route>
                        <Route component={PageTypeLoader}/>
                    </Switch>
                </div>

                <Footer
                    contentSv={siteData.footerContentSv}
                    contentEn={siteData.footerContentEn}
                />

            </LocaleContext.Provider>
        </div>
    );
}

export default App;
