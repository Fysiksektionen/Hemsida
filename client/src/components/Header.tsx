import { MenuItem, Select } from '@material-ui/core';
import Navbar from 'react-bootstrap/Navbar';
import { LocaleContext, locales } from '../contexts'
import './Header.css'
import logo from '../Fysiksektionen_logo.svg';
import se_flag from '../country_flags/se.svg';
import gb_flag from '../country_flags/gb.svg';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';
import {useContext} from "react";
import { ArrowDropDown } from '@material-ui/icons';

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
        <Navbar style={{ backgroundColor: "var(--F-light-gray)", width: "100%" }} expand="lg" className="row justify-content-between">
          <Navbar.Brand className="col mx-5 my-2" href="#" style={{fontSize: "2.35rem"}}> {/* fontSize is an ugly hack to make the text centered */}
            <img src={logo} height="80" alt="" />
            {/* <h2 className="d-inline pl-3 mt-3 mx-3">{content['name']}</h2> */}
          </Navbar.Brand>
          <div className="col">
            <div className="row d-flex flex-row-reverse">
              <Select
                IconComponent={() => <ArrowDropDown visibility="hidden"/>}
                disableUnderline
                className="my-2"
                value={locale.id}
                onChange={event => {
                props.setLocale(locales[event.target.value as string])
              }}>
                {Object.keys(locales).map(key =>
                  <MenuItem value={key} key={key}>
                    <div className="d-flex justify-content-center" style={{ width: "100%"}}>
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
  );
}
const flagIcons: { [key: string]: any; } = {
  "sv": <img src={se_flag} style={{ height: "1rem", width: "1.6rem" }}/>,
  "en": <img src={gb_flag} style={{ height: "1rem", width: "2rem" }}/>,
}

export default Header;
