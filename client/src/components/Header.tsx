import React, { useContext, useEffect, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import Navbar from 'react-bootstrap/Navbar';
import { Locale, LocaleContext, locales } from '../contexts';
import './Header.css';
import seFlag from '../country_flags/se.svg';
import gbFlag from '../country_flags/gb.svg';
import { GroupedSearch } from './SearchBox';
import HeaderMenu from './HeaderMenu';
import { ArrowDropDown } from '@material-ui/icons';
import ImageCO from './content_objects/ImageCO';
import { Col, Container, Row } from 'react-bootstrap';
import { SiteHeaderContentTree } from '../types/constent_object_trees';

type Props = {
    setLocale?: (locale: Locale) => void,
    contentSv: SiteHeaderContentTree,
    contentEn: SiteHeaderContentTree
}

export default function Header(props: Props) {
    const flagIcons: { [key: string]: any; } = {
        sv: <img src={seFlag} alt={'Svenska flaggan'} style={{ height: '1rem', width: '1.6rem' }}/>,
        en: <img src={gbFlag} alt={'English flag'} style={{ height: '1rem', width: '2rem' }}/>
    };
    const locale = useContext(LocaleContext);
    const [content, setContent] = useState(locale === locales.sv ? props.contentSv : props.contentEn);

    useEffect(() => {
        setContent(locale === locales.sv ? props.contentSv : props.contentEn);
    }, [locale, props.contentSv, props.contentEn]);

    function setImage(img: string) {
        setContent({
            ...content,
            items: {
                ...content?.items,
                logo: {
                    ...content?.items.logo,
                    image: {
                        ...content?.items.logo.image,
                        href: img
                    }
                }
            }
        });
    }

    return (
        <LocaleContext.Consumer>
            {locale =>
                <Navbar style={{ backgroundColor: 'var(--F-light-gray)', width: '100%' }} expand="lg" className="row justify-content-between">
                    <Navbar.Brand className="ml-lg-2 ml-xl-5 my-auto justify-content-start" href="#">
                        <Container>
                            <Row>
                                <Col xs={'auto'} className="my-auto">
                                    <ImageCO updateHook={setImage} src={content.items.logo.image.href} height="80" alt="" />
                                </Col>
                                <Col xs={'auto'} className="my-auto d-none d-lg-flex">
                                    <h4 className="m-0">{content.items.name.text}</h4>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Col xs={'auto'} className="d-none d-xl-flex">
                            <GroupedSearch/>
                        </Col>
                        <Col xs={'auto'}>
                            <Select
                                IconComponent={() => <ArrowDropDown visibility="hidden"/>}
                                disableUnderline
                                className="my-2"
                                value={locale.id}
                                onChange={event => {
                                    if (props.setLocale !== undefined) {
                                        props.setLocale(locales[event.target.value as string]);
                                    }
                                }}>
                                {Object.keys(locales).map(key =>
                                    <MenuItem value={key} key={key}>
                                        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                            {flagIcons[key]}
                                        </div>
                                    </MenuItem>
                                )}
                            </Select>
                        </Col>
                        <Col xs={'auto'} className="">
                            <HeaderMenu/>
                        </Col>
                    </Navbar.Collapse>
                </Navbar>}
        </LocaleContext.Consumer>
    );
}
