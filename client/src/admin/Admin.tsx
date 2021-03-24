import React, { createElement, useState } from 'react';
import { Col, Nav, Navbar, NavbarBrand, NavLink, Row } from 'react-bootstrap';
import { AdminPageProps } from '../types/admin_components';
import PagesAdminPage from './pages/Pages';
import UsersAdminPage from './users/Users';
import NewsAdminPage from './NewsEvents/NewsEvents';
import ImagesAdminPage from './images/Images';
import AdsAdminPage from './ads/Ads';
import SettingsAdminPage from './settings/Settings';
import ToolsAdminPage from './tools/Tools';
import GroupsAdminPage from './groups/Groups';
import { getGETParamsStringFromObject } from './utils';
import PageNotFound from '../pages/PageNotFound';

type AdminProps = {
    adminRootPath: string
}

type AdminMenuItem = {
    name: string,
    icon: string,
    getParams?: NodeJS.Dict<string|number|undefined>,
    component: React.FunctionComponent<AdminPageProps>
}

// Dynamic definition dictionary of menu items in Admin menu
export const adminMenuItems: NodeJS.Dict<AdminMenuItem> = {
    'pages/': {
        name: 'Pages',
        icon: 'fas fa-copy',
        getParams: { hej: 'val', es: 1 },
        component: PagesAdminPage
    },
    'news/': {
        name: 'News/Events',
        icon: 'fas fa-newspaper',
        component: NewsAdminPage
    },
    'ads/': {
        name: 'Ads',
        icon: 'fas fa-ad',
        component: AdsAdminPage
    },
    'images/': {
        name: 'Images',
        icon: 'fas fa-image',
        component: ImagesAdminPage
    },
    'users/': {
        name: 'Users',
        icon: 'fas fa-user',
        component: UsersAdminPage
    },
    'groups/': {
        name: 'Groups',
        icon: 'fas fa-users',
        component: GroupsAdminPage
    },
    'tools/': {
        name: 'Tools',
        icon: 'fas fa-tools',
        component: ToolsAdminPage
    },
    'settings/': {
        name: 'Settings',
        icon: 'fas fa-cog',
        component: SettingsAdminPage
    }
};

/**
 * Basic ReactComponent of the Admin console. This component is responsible for the left hand side menu and loading
 * the correct AdminPage. The state of the component is the current path, which allows for changing the
 * AdminPageComponent loaded.
 *
 * Changing currently loaded page is preferably done by setState and setAddressField, not by moving to another URL.
 * @param adminRootPath: Absolute path to where the component is mounted (OBS: leading AND trailing slash).
 */
export default function Admin({ adminRootPath }: AdminProps) {
    const BANNER_HEIGHT = '56px'; // Banner height in pixels

    /**
     * Function that parses the path and GET-parameters to desired format. Removes /admin/ from path and creates
     * an object of the GET-parameters.
     * @param path The path currently visited (relative to '/admin/').
     * @param searchString The get parameters given in path by the search parameter.
     */
    function getAdminPagePropsFromPath(path: string, searchString: string): AdminPageProps {
        // Remove leading ?
        if (searchString.length > 0 && searchString[0] === '?') {
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

        // Remove adminRootPath from the path
        if (path.startsWith(adminRootPath)) {
            path = path.substring(adminRootPath.length);
        }

        return { path: path, getParams: getParamsReturn };
    }

    const adminPageProps = getAdminPagePropsFromPath(window.location.pathname, window.location.search);
    const [state, setState] = useState(adminPageProps.path);

    /**
     * Hook to set the state of the component, and also update the address field in the browser accordingly.
     * @param path: Path relative to adminRootPath to display and set.
     * @param getParams: Object to translate into GET-parameters in the URL-field.
     */
    function setAddressField({ path, getParams }: AdminPageProps) {
        const getParamsString = getGETParamsStringFromObject(getParams);
        const fullUrl = window.location.origin + adminRootPath + path;
        window.history.replaceState(
            window.history.state?.data,
            window.history.state?.title,
            fullUrl + getParamsString
        );
    }

    function navOnSelect(key: (string | null)) {
        if (key !== null) {
            const params = { path: key, getParams: adminMenuItems[key]?.getParams };
            setAddressField(params);
            setState(params.path);
        }
    }

    const adminMenuItem = adminMenuItems[state];
    const adminComponent = (adminMenuItem !== undefined) ? adminMenuItem.component : null;

    return (
        <div className={'m-0 p-0 d-flex flex-column vh-100'}>
            {/* Top bar */}
            <Navbar fixed='top' variant='dark' className="bg-dark">
                <NavbarBrand>
                    Adminpanelen
                </NavbarBrand>
            </Navbar>

            {/* Below top bar full area */}
            <Row className="flex-grow-1 m-0" style={{ paddingTop: BANNER_HEIGHT }}>
                {/* Menu collapsed to only icons */}
                <div className="d-lg-none d-flex flex-column bg-secondary py-2 flex-shrink-1">
                    <Nav className="d-flex flex-column py-1 align-content-center" onSelect={navOnSelect}>
                        {Object.keys(adminMenuItems).map((path, index) =>
                            <NavLink key={index} eventKey={path}>
                                <h4 className="text-center"><i className={adminMenuItems[path]?.icon + ' mx-2'} /></h4>
                            </NavLink>
                        )}
                    </Nav>
                </div>

                {/* Menu expanded */}
                <div className="d-none d-lg-flex flex-column bg-secondary py-2 flex-shrink-1">
                    <Nav className="d-flex flex-column py-1 mr-4" onSelect={navOnSelect}>
                        {Object.keys(adminMenuItems).map((path, index) =>
                            <NavLink key={index} eventKey={path}>
                                {/* TODO: Fix icon alignment */}
                                <h4><i className={adminMenuItems[path]?.icon + ' mr-4 ml-2'}/>{adminMenuItems[path]?.name}</h4>
                            </NavLink>
                        )}
                    </Nav>
                </div>

                {/* The AdminPage */}
                <Col>
                    {adminComponent !== null ? createElement(adminComponent, adminPageProps) : <PageNotFound />}
                </Col>
            </Row>
        </div>
    );
};
