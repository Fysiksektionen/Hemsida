import React, { useEffect, useState } from 'react';
import { Locale, LocaleContext, locales } from './contexts';
import Frontpage from './pages/Frontpage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NewsFeedPage, { dummyArticles } from './pages/NewsFeedPage';
import PageTypeLoader from './components/PageTypeLoader';

// Fake data for header and footer
type SiteData = {
    headerContentSv: { [key: string]: string },
    headerContentEn: { [key: string]: string },
    footerContentSv: { [key: string]: string },
    footerContentEn: { [key: string]: string }
};

type SiteResp = {
    code: number,
    data: SiteData
}

const mockSiteResp: SiteResp = {
    code: 200,
    data: {
        headerContentSv: {
            name: 'Fysiksektionen'
        },
        headerContentEn: {
            name: 'The Physics Chapter'
        },
        footerContentSv: {
            webmaster: 'Christoffer Ejemyr',
            currYear: '2021',
            address: 'Brinellvägen 89, 114 28 Stockholm'
        },
        footerContentEn: {
            webmaster: 'Christoffer Ejemyr',
            currYear: '2021',
            address: 'Brinellvägen 89, 114 28 Stockholm'
        }
    }
};
// End of fake data

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);
    const [siteData, setSiteData] = useState<SiteData>();

    useEffect(() => {
        // Fake start (replace by server call)
        const siteResp = mockSiteResp;
        // Fake end

        setSiteData(siteResp.data);
    }, [setSiteData]);

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>

                <Header
                    setLocale={setLocale}
                    contentSv={siteData ? siteData.headerContentSv : {}}
                    contentEn={siteData ? siteData.headerContentEn : {}}
                />

                <div className="content container">
                    <Switch>
                        {/* Frontpage should maybe be included in the dynamic page loader,
                    but left here for illustrative purposes of non-dynamic loading of
                    components (i.e. login, admin, etc.). */}
                        <Route exact={true} path={['/', '/start', '/index', '/hem', '/home']}>
                            <Frontpage pageType="start" />
                        </Route>
                        <Route path="/nyheter">
                            <NewsFeedPage newsArticles={dummyArticles}/>
                        </Route>
                        <Route component={PageTypeLoader}/>
                    </Switch>
                </div>

                <Footer
                    contentSv={siteData ? siteData.footerContentSv : {}}
                    contentEn={siteData ? siteData.footerContentEn : {}}
                />

            </LocaleContext.Provider>
        </div>
    );
}

export default App;
