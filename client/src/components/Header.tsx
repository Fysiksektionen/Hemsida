import { Select } from '@material-ui/core';
import Navbar from 'react-bootstrap/Navbar';
import { LocaleContext, locales } from '../contexts'
import './Header.css'
import logo from '../Fysiksektionen_logo.svg';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';


type Props = {
    setLocale: Function
}

function Header(props: Props) {
  return (
    <LocaleContext.Consumer>
      {locale =>
        <Navbar bg="light" expand="lg" className="justify-content-between">
          <Navbar.Brand className="mx-5 px-4 my-2" href="#" style={{fontSize: "2.35rem"}}> {/* fontSize is an ugly hack to make the text centered */}
            <img src={logo} width="80" height="80" alt="" />
            <h2 className="d-inline pl-3 mt-3 mx-3">Fysiksektionen</h2>
          </Navbar.Brand>
          <div className="row">
            {/* <Select className="mx-4" value={locale.id} onChange={event => {
              props.setLocale(locales[event.target.value as string])
            }}>
              {Object.keys(locales).map(key =>
                <option value={key} key={key}>
                  {locales[key].name}
                </option>
                )}
            </Select> */}
            <HeaderMenu />
            <GroupedSearch/>
          </div>
        </Navbar>}
    </LocaleContext.Consumer>
  );
}

export default Header;
