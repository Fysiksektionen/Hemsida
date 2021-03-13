import { Select } from '@material-ui/core';
import { LocaleContext, locales } from '../contexts'
import './Header.css'
import logo from '../Fysiksektionen_logo.svg';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';
import {useContext} from "react";


type Props = {
    setLocale: Function,
    content_sv: NodeJS.Dict<string>,
    content_en: NodeJS.Dict<string>
}

function Header(props: Props) {
    const locale = useContext(LocaleContext);
    const content = locale === locales.sv ? props.content_sv : props.content_en;

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
                    <h2>{content["name"]}</h2>
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
                            <option value={key} key={key}>{locales[key].name}</option>
                        )}
                    </Select>

            </div>}
        </LocaleContext.Consumer>
    );
}

export default Header;
