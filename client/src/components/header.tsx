import { Button, Container, Select } from '@material-ui/core';
import { LocaleContext, locales } from '../contexts'
import './header.css'
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import logo from '../Fysiksektionen_logo.svg';
import { GroupedSearch } from './search-box';
import HeaderMenu from './HeaderMenu';


type Props = {
    setLocale: Function
}

function Header(props: Props) {
    return (
        <LocaleContext.Consumer>
        {locale => 
            <div 
            className="navbar sticky-top bg-light px-4" 
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
            >
            <a className="navbar-brand mx-5 text-center" href="/">
                <img src={logo} width="80" height="80" alt="" />
                <h2>Fysiksektionen</h2>
            </a>
            <div>
            <div className="mx-4">
                <GroupedSearch/>
            </div>
            <HeaderMenu/>
            </div>

                <Select value={locale.id} onChange={event => {
                    props.setLocale(locales[event.target.value as string])
                }}>
                    {Object.keys(locales).map(key => 
                        <option value={key}>{locales[key].name}</option>
                    )}
                </Select>

        </div>}
        </LocaleContext.Consumer>
    );
}

export default Header;
