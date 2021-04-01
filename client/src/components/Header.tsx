import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Locale, LocaleContext } from '../contexts';
import './Header.css';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';
import ImageCOR from './content_object_renderers/ImageCOR';
import { Col, Container, Row } from 'react-bootstrap';
import { SiteHeaderCT } from '../types/content_object_trees';
import LocaleSelector from './LocaleSelector';
import TextCOR from './content_object_renderers/TextCOR';

type Props = {
    setLocale?: (locale: Locale) => void,
    content: SiteHeaderCT
}

export default function Header({ setLocale, content }: Props) {
    return (
        <LocaleContext.Consumer>
            {locale =>
                <Navbar style={{ backgroundColor: 'var(--F-light-gray)' }} expand="lg" className="d-flex justify-content-between">
                    <Navbar.Brand className="ml-lg-2 ml-xl-5 my-auto justify-content-start" href="#">
                        <Container>
                            <Row>
                                <Col xs={'auto'} className="my-auto">
                                    <ImageCOR imageCO={content.items.logo} height="80" alt="" />
                                </Col>
                                <Col xs={'auto'} className="my-auto d-none d-lg-flex">
                                    <h4 className="m-0">
                                        <TextCOR textCO={content.items.name} />
                                    </h4>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Col xs={'auto'} className="d-none d-xl-flex">
                            <GroupedSearch/>
                        </Col>
                        <Col xs={'auto'}>
                            <LocaleSelector localeState={locale} setLocaleHook={setLocale}/>
                        </Col>
                        <Col xs={'auto'} className="">
                            <HeaderMenu/>
                        </Col>
                    </Navbar.Collapse>
                </Navbar>}
        </LocaleContext.Consumer>
    );
}
