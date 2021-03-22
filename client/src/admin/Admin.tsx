import React from 'react';
import { Col, Navbar, NavbarBrand, NavLink, Row } from 'react-bootstrap';

type menuItem = {
    name: string,
    icon: string,
    link: string
}

const menuItems: menuItem[] = [
    {
        name: 'Pages',
        icon: 'fas fa-user',
        link: 'pages/'
    },
    {
        name: 'Users',
        icon: 'far fa-copy',
        link: 'users/'
    }
];

export default function Admin() {
    const BANNER_HEIGHT = '56px'; // Banner height in pixels

    return (
        <div className={'m-0 p-0 d-flex flex-column vh-100'}>
            <Navbar fixed='top' variant='dark' className="bg-dark">
                <NavbarBrand>
                    Adminpanelen
                </NavbarBrand>
            </Navbar>
            <Row className="flex-grow-1 m-0" style={{ paddingTop: BANNER_HEIGHT }}>
                <Col xl={2} lg={3} md={4} className="d-none d-md-flex flex-column bg-secondary">
                    {menuItems.map((item, index) =>
                        <Row key={index} className="px-3 py-2">
                            <NavLink href={'/admin/' + item.link}>
                                <h4><i className={item.icon}/>   {item.name}</h4>
                            </NavLink>
                        </Row>
                    )}
                </Col>
                <Col className="">

                </Col>
            </Row>
        </div>
    );
};
