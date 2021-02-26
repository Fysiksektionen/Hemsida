import React, {useState} from 'react';
import { LocaleContext, locales } from './contexts'
import Frontpage from './pages/frontpage'
import NewsArticlePage from './pages/news_article_page'
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route } from "react-router-dom";
import './App.css'
import {DummyData2} from './components/news/frontpage_news_widget'


function App() {

    const [locale, setLocale] = useState(locales.sv)

    return (
        <div className="App">
        <LocaleContext.Provider value={locale}>

            <Header setLocale={setLocale}/>

            <div className="content container">
                <Switch>

                    <Route path="/newsarticle">
                        <NewsArticlePage {...DummyData2} />
                    </Route>

                    <Route path="/">
                        <Frontpage />
                    </Route>

                </Switch>
            </div>

            <Footer />

        </LocaleContext.Provider>
        </div>
    );
}

export default App;
