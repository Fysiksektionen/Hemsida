import React, { useState } from 'react';
import { Col, Nav, Navbar, NavbarBrand, NavLink, Row } from 'react-bootstrap';
import { menuItems } from './admin_menu_maps';
import { AdminPageProps } from '../types/admin_components';
import { Route, Switch, useLocation } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import { forEach } from 'react-bootstrap/ElementChildren';

const adminRootPath = '/admin/';

type AdminState = {
    loadedComponentProps: AdminPageProps
};

/**
 * Function that parses the path and GET-parameters to desired format. Removes /admin/ from path and creates
 * an object of the GET-parameters.
 * @param path The path currently visited (relative to '/admin/').
 * @param searchString The get parameters given in path by the search parameter.
 */
function getAdminPagePropsFromPath(path: string, searchString: string): AdminPageProps {
    // Remove leading ?
    if (searchString[0] === '?') {
        searchString = searchString.substring(1);
    }
    // Split over different args
    const splitArgs = searchString.split('&');

    // For each element, if it has value, use that. Else just set the key with undefined.
    const getParamsReturn: NodeJS.Dict<string | undefined> = {};
    splitArgs.forEach((item) => {
        if (item.includes('=')) {
            const [key, val] = item.split('=', 1);
            getParamsReturn[key] = val;
        } else if (item !== '') {
            getParamsReturn[item] = undefined;
        }
    });

    // Remove /admin/ from the path
    if (path.startsWith('/admin/')) {
        path = path.substring(6);
    }

    return { path: path, getParams: getParamsReturn };
}

/**
 * Basic ReactComponent of the Admin console. This component is responsible for the left hand side menu and loading
 * the correct AdminPage.
 *
 * Changing currently loaded page is preferably done by the state hook, not by moving to another URL.
 */
export default function Admin() {
    const BANNER_HEIGHT = '56px'; // Banner height in pixels

    const location = useLocation();

    const [state, setState] = useState(
        getAdminPagePropsFromPath(location.pathname, location.search)
    );

    return (
        <div className={'m-0 p-0 d-flex flex-column vh-100'}>
            <Navbar fixed='top' variant='dark' className="bg-dark">
                <NavbarBrand>
                    Adminpanelen
                </NavbarBrand>
            </Navbar>
            <Row className="flex-grow-1 m-0" style={{ paddingTop: BANNER_HEIGHT }}>
                <div className="d-lg-none d-flex flex-column bg-secondary py-2" style={{ width: '60px' }}>
                    {/* {menuItems.map((item, index) => */}
                    {/*    <Nav key={index} className="row py-1 justify-content-center" */}
                    {/*        onSelect={(key) => { */}
                    {/*            if (key !== null) { */}
                    {/*                setState({ path: key, getParams: {} }); */}
                    {/*            } */}
                    {/*        }} */}
                    {/*    > */}
                    {/*        <NavLink href={adminRootPath + item.path} eventKey={item.path}> */}
                    {/*            <h4><i className={item.icon}/></h4> */}
                    {/*        </NavLink> */}
                    {/*    </Nav> */}
                    {/* )} */}
                </div>
                <Col xl={2} lg={3} className="d-none d-lg-flex flex-column bg-secondary py-2">
                    {/* {menuItems.map((item, index) => */}
                    {/*    <Nav key={index} className="row px-3 py-1" */}
                    {/*        onSelect={(key) => { */}
                    {/*            if (key !== null) { */}
                    {/*                setState({ path: key, getParams: {} }); */}
                    {/*            } */}
                    {/*        }} */}
                    {/*    > */}
                    {/*        <NavLink eventKey={item.path}> */}
                    {/*            <h4><i className={item.icon + ' mr-4'}/>{item.name}</h4> */}
                    {/*        </NavLink> */}
                    {/*    </Nav> */}
                    {/* )} */}
                </Col>
                <Col>
                    <Switch>
                        {Object.entries(menuItems).map(([path, item], index) => {
                            if (item !== undefined) {
                                return (
                                    <Route path={adminRootPath + path} exact={true} key={index}>
                                        {item.component(state)}
                                    </Route>
                                );
                            } else { return <></>; }
                        })}
                        <Route>
                            <PageNotFound />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </div>
    );
};
