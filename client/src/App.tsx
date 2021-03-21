import React, { useState } from 'react';
import { LocaleContext, locales } from './contexts';
import Frontpage from './pages/Frontpage';
import NewsArticlePage from './pages/NewsArticlePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NewsFeedPage, { dummyArticles } from './pages/NewsFeedPage';
import { DummyData2 } from './components/news/FrontpageNewsWidget';
import StyretPage from './pages/StyretPage';

function App() {
    const [locale, setLocale] = useState(locales.sv);

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>
                <Header setLocale={setLocale}/>
                <div className="content container">
                    <Switch>
                        <Route path="/nyheter">
                            <NewsFeedPage newsArticles={dummyArticles}/>
                        </Route>

                        <Route path="/styret">
                            <StyretPage/>
                        </Route>

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
