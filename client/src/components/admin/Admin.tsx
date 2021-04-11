import React, { createElement, useState } from 'react';
import '../../index.css';
import { Col, Container, Image, Navbar, NavLink, Row } from 'react-bootstrap';
import { AdminLocation, AdminPageProps } from '../../types/admin_components';
import PagesAdminPage from './pages/Pages';
import UsersAdminPage from './users/Users';
import NewsAdminPage from './news_events/NewsEvents';
import ImagesAdminPage from './images/Images';
import AdsAdminPage from './ads/Ads';
import SettingsAdminPage from './settings/Settings';
import ToolsAdminPage from './tools/Tools';
import GroupsAdminPage from './groups/Groups';
import PageNotFound from '../../pages/PageNotFound';
import { adminRootPath, setAddressField } from './utils';
import logo from '../../Fysiksektionen_logo.svg';

type AdminMenuItem = {
    name: string,
    icon: string,
    getParams?: NodeJS.Dict<string|undefined>,
    component: React.FunctionComponent<AdminPageProps>
}

// Dynamic definition dictionary of menu items in Admin menu
export const adminMenuItems: NodeJS.Dict<AdminMenuItem> = {
    'pages/': {
        name: 'Pages',
        icon: 'fas fa-copy',
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
 */
export default function Admin() {
    /**
     * Function that parses the path and GET-parameters to desired format. Removes /admin/ from path and creates
     * an object of the GET-parameters.
     * @param path The path currently visited (relative to '/admin/').
     * @param searchString The get parameters given in path by the search parameter.
     * @returns object of type {path: string, getParams: NodeJS.Dict<string|undefined>>}
     */
    function getPathAndGetParams(path: string, searchString: string) {
        // Remove leading ?
        if (searchString.length > 0 && searchString[0] === '?') {
            searchString = searchString.substring(1);
        }
        // Split over different args
        const splitArgs = searchString.split('&');

        // For each element, if it has value, use that. Else just set the key with undefined.
        const getParamsReturn: NodeJS.Dict<string> = {};
        splitArgs.forEach((item) => {
            if (item.includes('=')) {
                const [key, val] = item.split('=', 2);
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

    const pathAndGetParams = getPathAndGetParams(window.location.pathname, window.location.search);
    const [locationState, setLocationState] = useState<AdminLocation>(pathAndGetParams);

    const adminPageProps = {
        ...pathAndGetParams,
        setLocationHook: (props: AdminLocation) => {
            setAddressField(props);
            setLocationState(props);
        }
    };

    /**
     * Changed the address bar and the component state on menu selection.
     * @param key: The menu item key.
     */
    function navOnSelect(key: (string | null)) {
        if (key !== null) {
            const params = { path: key, getParams: adminMenuItems[key]?.getParams || {} };
            setAddressField(params);
            setLocationState({ path: params.path, getParams: {} });
        }
    }

    const adminMenuItem = adminMenuItems[locationState.path];
    const adminComponent = (adminMenuItem !== undefined) ? adminMenuItem.component : null;

    return (
        <Container fluid className='mx-0 px-0'>
            {/* Top bar */}
            <div className='d-flex justify-content-center w-100 text-white bg-secondary'>
                <Col xs={10}>
                    <Row className='pt-6 pb-45'>
                        <Image height='85px' src={logo} />
                    </Row>
                </Col>
            </div>
            <div className='d-none d-lg-block'>
                <div className='d-flex justify-content-center w-100 text-white bg-secondary sticky-top'>
                    <Col xs={10}>
                        <Row>
                            <Navbar className="w-100 px-1 py-0 adminnav" onSelect={navOnSelect}>
                                {Object.keys(adminMenuItems).map((path, index) =>
                                    <NavLink key={index} eventKey={path}
                                        className='ml-2 mr-5 px-1 py-3 text-white font-weight-bold'>
                                        {adminMenuItems[path]?.name}
                                    </NavLink>
                                )}
                            </Navbar>
                        </Row>
                    </Col>
                </div>

                {/* The AdminPage */}
                <Col className='mx-0 px-0'>
                    {adminComponent !== null ? createElement(adminComponent, adminPageProps) : <PageNotFound />}
                </Col>
            </div>
            <div className='d-lg-none'>
                <Col className='text-center pt-5'>
                    Adminpanelen kräver en fönsterstorlek på minst 992 px.
                </Col>
            </div>
        </Container>
    );
};
