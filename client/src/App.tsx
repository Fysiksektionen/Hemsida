import React from 'react';
import Frontpage from './pages/frontpage'
import NewsArticlePage from './pages/news_article_page'
import StyretPage from './pages/styret_page'
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route } from "react-router-dom";
import './App.css'
import {DummyData2} from './components/news/frontpage_news_widget'


function App() {
  return (
    <div className="App">

        <Header />

        <div className="content container">
            <Switch>

                <Route path="/newsarticle">
                    <NewsArticlePage {...DummyData2} />
                </Route>

                <Route path="/styret">
                    <StyretPage/>
                </Route>

                <Route path="/">
                    <Frontpage />
                </Route>

            </Switch>
        </div>

        <Footer />

    </div>
  );
}

export default App;
