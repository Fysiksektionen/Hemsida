import React from 'react';
import GoogleMap from '../GoogleMap';
import { LocaleContext, locales } from '../../contexts';
import { SiteFooterCT, SiteFooterQuickAccessMenuCT } from '../../types/content_objects/content_trees/site';
import TextCOR from '../content_object_renderers/TextCOR';
import { Col, Row, Image } from 'react-bootstrap';
import footerLogo from '../../mediafiles/placeholder_images/footer_logo.png';
import RichTextCOR from '../content_object_renderers/blocks/RichTextCOR';

type FooterProps = {
    content: SiteFooterCT
}

function Footer({ content }: FooterProps) {
    return (
        <LocaleContext.Consumer>
            {locale =>
                <Col className='bg-F-darkest-blue text-white'>
                    <Row className='justify-content-center py-5'>
                        <Col>
                            <Row className='justify-content-center'>
                                <h4>{locale === locales.sv ? 'Hitta hit!' : 'Find us!'}</h4>
                            </Row>
                            <Row className='justify-content-center mb-4'>
                                <TextCOR textCO={content.items.address} />
                            </Row>
                            <Row className='justify-content-center'>
                                <GoogleMap width='75%' height='300px'/>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='justify-content-around my-5 px-5'>
                        {content.items.quickAccess.items.map((item, index) => (
                            <Col xs={'auto'} key={index}>
                                <div className='text-F-orange font-weight-bold mb-4 text-uppercase'>
                                    <RichTextCOR content={(item as SiteFooterQuickAccessMenuCT).items.header} />
                                </div>
                                <div>
                                    <RichTextCOR content={(item as SiteFooterQuickAccessMenuCT).items.info} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row className='justify-content-center pb-6 mt-4'>
                        <Image src={footerLogo} className='w-25' />
                    </Row>
                </Col>
            }
        </LocaleContext.Consumer>
    );
}

export default Footer;
/*
<strong>Ordförande</strong><br/>
Christoffer Ejemyr<br/>
073 – 385 48 66<br/>
ordf@f.kth.se<br/>
<br/>
<strong>Postadress</strong><br/>
Fysiksektionen, THS<br/>
100 44 Stockholm<br/>
<br/>
<strong>Organisationsnummer</strong><br/>
802411-8948
*/
