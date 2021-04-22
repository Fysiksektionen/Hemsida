import React, { useContext, useEffect, useState } from 'react';
import { Drawer } from '@material-ui/core';
import { EditorialModeContext } from '../../contexts';
import { Col, Container, Row } from 'react-bootstrap';
import { ContentMenu, Menu, MenuItem } from '../../types/api_object_types';
import './HeaderMenu.scss';

/**
 * Renders items of one column in the header menu.
 * @param items List of MenuItems to render
 * @constructor
 */
function HeaderMenuColumn({ items }: {items: (Menu|MenuItem)[]}) {
    return (
        <>
            {items.map((item, index) => (
                <Row key={index}>
                    <Col className='px-6 py-4'>
                        {/* Heading */}
                        <h2 className='mb-3'>{item.name}</h2>

                        {/* Sub-items */}
                        {item.isMenu &&
                            <>
                                {(item as Menu).items.map((subItem, subIndex) => (
                                    <h4 key={subIndex} className='ml-3'>
                                        <a className='subLink' href={subItem.link}>
                                            {subItem.name}
                                        </a>
                                    </h4>
                                ))}
                            </>
                        }
                    </Col>
                </Row>
            ))}
        </>
    );
}

type HeaderMenuProps = {
    content: ContentMenu,
    open: boolean,
    setOpen: (open: boolean) => void
}

// TODO: Fix HeaderMEnu for small window-sizes

/**
 * Renders the Drawer menu from the right of the page.
 * @param content ContentMenu to render
 * @param open If drawer should be open
 * @param setOpen Hook to change drawer state
 * @constructor
 */
export default function HeaderMenu({ content, open, setOpen }: HeaderMenuProps) {
    const edit = useContext(EditorialModeContext);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if ((event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) || edit) {
            return;
        }
        setOpen(open);
    };

    const [menus, setMenus] = useState<{left:(MenuItem|Menu)[], right: (MenuItem|Menu)[]}>({ left: [], right: [] });

    useEffect(() => {
        const slice = Math.ceil(content.menu.items.length / 2);
        const leftMenus = content.menu.items.slice(0, slice);
        const rightMenus = content.menu.items.slice(slice, -1);
        setMenus({ left: leftMenus, right: rightMenus });
    }, [content]);

    return (
        <React.Fragment key={'right'}>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div className='bg-F-dark-blue vh-100 text-F-gray'>
                    <Container className='drawerMd'>
                        <Row className='header'>
                            <Col xs={12} className='my-auto'>
                                <Row className='justify-content-end'>
                                    <a
                                        id='close'
                                        className='fas fa-times icon nostyle'
                                        onClick={() => { setOpen(false); }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row className='menus'>
                            {[menus.left, menus.right].map((list, index) => (
                                <Col key={index} className='text-nowrap'>
                                    <HeaderMenuColumn items={list} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
