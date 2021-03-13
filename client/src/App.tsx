import React, {useState} from 'react'
import { LocaleContext, locales } from './contexts'
import Header from './components/Header'
import Footer from './components/Footer'
import { Switch, Route } from "react-router-dom"
import './App.css'
import PageTypeLoader from "./components/PageTypeLoader";


function App() {

    const [locale, setLocale] = useState(locales.sv)

    return (
        <div className="App">
        <LocaleContext.Provider value={locale}>

            <Header setLocale={setLocale}/>

            <div className="content container">
                <Switch>
                    <Route component={PageTypeLoader}/>
                </Switch>
            </div>
            <Footer />

        </LocaleContext.Provider>
        </div>
    );
}

export default App;