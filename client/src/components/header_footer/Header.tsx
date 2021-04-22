import React, { useContext, useState } from 'react';
import { Locale, LocaleContext } from '../../contexts';
import HeaderMenu from './HeaderMenu';
import ImageCOR from '../content_object_renderers/ImageCOR';
import { Col, Row } from 'react-bootstrap';
import { SiteHeaderCT } from '../../types/content_objects/content_trees/site';
import './Header.scss';

type Props = {
    setLocale?: (locale: Locale) => void,
    content: SiteHeaderCT
}

/**
 * Header used when view-size is smaller than md.
 * @param setLocale Hook to set locale of entire page
 * @param content ContentObject to render header
 * @param setMenuOpen Hook to open side-menu
 * @constructor
 */
function HeaderXs({ setLocale, content, setMenuOpen }: Props & { setMenuOpen: (open: boolean) => void }) {
    return (
        <Col>
            <Row className='headerXs'>
                <Col className='my-auto px-0'>
                    <div className='logoContainer'>
                        <ImageCOR content={content.items.logo} />
                    </div>
                </Col>
                <Col className='my-auto'>
                    <Row className='justify-content-end'>
                        <a
                            className='fas fa-bars nostyle icon'
                            onClick={() => { setMenuOpen(true); }}
                        />
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}

/**
 * Header used when view-size is lager than md.
 * @param setLocale Hook to set locale of entire page
 * @param content ContentObject to render header
 * @param setMenuOpen Hook to open side-menu
 * @constructor
 */
function HeaderMd({ setLocale, content, setMenuOpen }: Props & { setMenuOpen: (open: boolean) => void }) {
    return (
        <Col>
            <Row className='headerMd'>
                <Col className='my-auto px-0'>
                    <div className='logoContainer'>
                        <ImageCOR content={content.items.logo} />
                    </div>
                </Col>
                <Col xs={'auto'} className='h-100'>
                    <Row className='d-none d-xxl-flex justify-content-center h-100'>
                        {content.items.midMenu.menu.items.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    className='midMenuLink'
                                    href={item.link}
                                >
                                    {item.name}
                                </a>
                            );
                        })}
                    </Row>
                </Col>
                <Col className='my-auto' >
                    <Row className='justify-content-end'>
                        <a
                            id='search'
                            className='fas fa-search fa-flip-horizontal nostyle icon'
                        />
                        <a
                            id='menu'
                            className='fas fa-bars nostyle icon'
                            onClick={() => { setMenuOpen(true); }}
                        />
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}

/**
 * Component for the header.
 * @param setLocale Hook to set the locale of the entire page
 * @param content ContentObject of the header
 * @constructor
 */
export default function Header({ setLocale, content }: Props) {
    const locale = useContext(LocaleContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Col>
            <Row className='d-none d-md-flex'>
                <HeaderMd content={content} setMenuOpen={setMenuOpen} setLocale={setLocale} />
                <HeaderMenu content={content.items.mainMenu} open={menuOpen} setOpen={setMenuOpen} />
            </Row>
            <Row className='d-md-none'>
                <HeaderXs content={content} setMenuOpen={setMenuOpen} setLocale={setLocale} />
                {/* <HeaderMenu content={content.items.mainMenu} open={menuOpen} setOpen={setMenuOpen} /> */}
            </Row>
        </Col>
    );
}
