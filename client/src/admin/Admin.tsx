import React, { useState } from 'react';
import { Col, Navbar, NavbarBrand, NavLink, Row } from 'react-bootstrap';
import PagesAdminPage from './Pages';
import { menuItems, pathToAdminComponent } from './admin_menu_maps';
import { AdminPageProps } from '../types/admin_components';
import { useLocation } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';

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
    const componentProps = getAdminPagePropsFromPath(location.pathname, location.search);

    const [adminState, setAdminState] = useState({ loadedComponentProps: componentProps });

    let adminPage = pathToAdminComponent[adminState.loadedComponentProps.path];
    if (adminPage === undefined) {
        adminPage = PageNotFound;
    }

    return (
        <div className={'m-0 p-0 d-flex flex-column vh-100'}>
            <Navbar fixed='top' variant='dark' className="bg-dark">
                <NavbarBrand>
                    Adminpanelen
                </NavbarBrand>
            </Navbar>
            <Row className="flex-grow-1 m-0" style={{ paddingTop: BANNER_HEIGHT }}>
                <div className="d-lg-none d-flex flex-column bg-secondary py-2" style={{ width: '60px' }}>
                    {menuItems.map((item, index) =>
                        <Row key={index} className=" py-1 justify-content-center">
                            <NavLink onSelect={() => {
                                setAdminState({
                                    loadedComponentProps: {
                                        path: item.path, getParams: (item.getParams ? item.getParams : {})
                                    }
                                });
                            }}>
                                <h4><i className={item.icon}/></h4>
                            </NavLink>
                        </Row>
                    )}
                </div>
                <Col xl={2} lg={3} className="d-none d-lg-flex flex-column bg-secondary py-2">
                    {menuItems.map((item, index) =>
                        <Row key={index} className="px-3 py-1">
                            <NavLink onSelect={() => {
                                setAdminState({
                                    loadedComponentProps: {
                                        path: item.path, getParams: (item.getParams ? item.getParams : {})
                                    }
                                });
                            }}>
                                <h4><i className={item.icon + ' mr-4'}/>{item.name}</h4>
                            </NavLink>
                        </Row>
                    )}
                </Col>
                <Col>
                    {adminPage({
                        path: adminState.loadedComponentProps.path,
                        getParams: adminState.loadedComponentProps.getParams
                    })}
                </Col>
            </Row>
        </div>
    );
};
