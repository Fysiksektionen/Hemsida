import React, {useEffect, useState} from 'react'
import {Locale, LocaleContext, locales} from './contexts'
import Header from './components/Header'
import Footer from './components/Footer'
import { Switch, Route } from "react-router-dom"
import './App.css'
import PageTypeLoader from "./components/PageTypeLoader"
import Frontpage from "./pages/Frontpage"


function App() {

    const [locale, setLocale] = useState<Locale>(locales.sv);
    const [siteData, setSiteData] = useState<SiteData>();

    useEffect(() => {
        let siteResp;

        // Fake start (replace by server call)
        siteResp = mockSiteResp;
        // Fake end

        setSiteData(siteResp.data);
    }, [setSiteData]);

    return (
        <div className="App">
        <LocaleContext.Provider value={locale}>

            <Header
                setLocale={setLocale}
                content_sv={siteData ? siteData.header_content_sv : {}}
                content_en={siteData ? siteData.header_content_en : {}}
            />

            <div className="content container">
                <Switch>
                    {/* Frontpage should maybe be included in the dynamic page loader,
                    but left here for illustrative purposes of non-dynamic loading of
                    components (i.e. login, admin, etc.). */}
                    <Route exact={true} path={["/", "/start", "/index", "/hem", "/home"]}>
                        <Frontpage page_type="start" />
                    </Route>
                    <Route component={PageTypeLoader}/>
                </Switch>
            </div>

            <Footer
                content_sv={siteData ? siteData.footer_content_sv : {}}
                content_en={siteData ? siteData.footer_content_en : {}}
            />

        </LocaleContext.Provider>
        </div>
    );
}

export default App;


// Fake data for header and footer
type SiteData = {
    header_content_sv: NodeJS.Dict<string>,
    header_content_en: NodeJS.Dict<string>,
    footer_content_sv: NodeJS.Dict<string>,
    footer_content_en: NodeJS.Dict<string>
};

type SiteResp = {
    code: number,
    data: SiteData
}

const mockSiteResp: SiteResp = {
    code: 200,
    data: {
        header_content_sv: {
            "name": "Fysiksektionen"
        },
        header_content_en: {
            "name": "The Physics Chapter"
        },
        footer_content_sv: {
            "webmaster": "Christoffer Ejemyr",
            "currYear": "2021",
            "address": "Brinellvägen 89, 114 28 Stockholm"
        },
        footer_content_en: {
            "webmaster": "Christoffer Ejemyr",
            "currYear": "2021",
            "address": "Brinellvägen 89, 114 28 Stockholm"
        },
    }
}