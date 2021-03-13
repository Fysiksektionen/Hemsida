import React, {useState} from 'react'
import { LocaleContext, locales } from './contexts'
import Header from './components/Header'
import Footer from './components/Footer'
import { Switch, Route } from "react-router-dom"
import './App.css'
import PageTypeLoader from "./components/PageTypeLoader";
import Frontpage from "./pages/Frontpage";


function App() {

    const [locale, setLocale] = useState(locales.sv)

    return (
        <div className="App">
        <LocaleContext.Provider value={locale}>

            <Header setLocale={setLocale}/>

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
            <Footer />

        </LocaleContext.Provider>
        </div>
    );
}

export default App;