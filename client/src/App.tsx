import React from 'react';
import Frontpage from './pages/frontpage'
import Header from './components/header'
import Footer from './components/footer'
import { Switch, Route } from "react-router-dom";
import './App.css'


function App() {
  return (
    <div className="App">

        <Header />

        <div className="content container">
            <Switch>

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
