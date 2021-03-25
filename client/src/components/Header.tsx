import React, { useContext, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import Navbar from 'react-bootstrap/Navbar';
import { EditorialModeContext, LocaleContext, locales } from '../contexts';
import './Header.css';
import defaultLogo from '../Fysiksektionen_logo.svg';
import seFlag from '../country_flags/se.svg';
import gbFlag from '../country_flags/gb.svg';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';
import { ArrowDropDown } from '@material-ui/icons';

type Props = {
    setLocale: Function,
    contentSv: { [key: string]: string },
    contentEn: { [key: string]: string }
}

export default function Header(props: Props) {
    const [logo, setLogo] = useState(defaultLogo);

    const flagIcons: { [key: string]: any; } = {
        sv: <img src={seFlag} alt={'Svenska flaggan'} style={{ height: '1rem', width: '1.6rem' }}/>,
        en: <img src={gbFlag} alt={'English flag'} style={{ height: '1rem', width: '2rem' }}/>
    };
    const locale = useContext(LocaleContext);
    const content = locale === locales.sv ? props.contentSv : props.contentEn;

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <LocaleContext.Consumer>
                    {locale =>
                        <Navbar style={{ backgroundColor: 'var(--F-light-gray)', width: '100%' }} expand="lg" className="row justify-content-between">
                            <Navbar.Brand className="col mx-5 my-2" href="#" style={{ fontSize: '2.35rem' }}> {/* fontSize is an ugly hack to make the text centered */}
                                <img src={logo} height="80" alt="" />
                                <h2 className="d-inline pl-3 mt-3 mx-3 hidden">{content.name}</h2>
                            </Navbar.Brand>
                            <div className="col">
                                <div className="row d-flex flex-row-reverse">
                                    <Select
                                        IconComponent={() => <ArrowDropDown visibility="hidden"/>}
                                        disableUnderline
                                        className="my-2"
                                        value={locale.id}
                                        onChange={event => {
                                            props.setLocale(locales[event.target.value as string]);
                                        }}>
                                        {Object.keys(locales).map(key =>
                                            <MenuItem value={key} key={key}>
                                                <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                                    {flagIcons[key]}
                                                </div>
                                            </MenuItem>
                                        )}
                                    </Select>
                                </div>
                                <div className="row d-flex flex-row-reverse">
                                    <HeaderMenu/>
                                </div>
                                <div className="row d-flex flex-row-reverse mx-3 mb-3">
                                    <GroupedSearch/>
                                </div>
                            </div>
                        </Navbar>}
                </LocaleContext.Consumer>
            }
        </EditorialModeContext.Consumer>
    );
}
