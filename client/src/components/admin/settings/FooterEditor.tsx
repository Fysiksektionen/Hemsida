import React, { MouseEvent, useContext, useState } from 'react';
import {
    ContentTreeContext,
    EditorialModeContext,
    LocaleContext,
    locales,
    useCTReducer
} from '../../../contexts';
import Footer from '../../header_footer/Footer';
import { SiteFooterCT } from '../../../types/content_objects/content_trees/site';
import { Button, Col, Row } from 'react-bootstrap';
import LocaleSelector from '../../LocaleSelector';

export type FooterEditorProps = {
    footerContentInitial: {sv: SiteFooterCT, en: SiteFooterCT},
}

/**
 * Component providing editing behaviour of Footer component. Uses the CTReducer and
 * EditorialModeContext to enable the built-it editing behaviour in the Footer component.
 * @param footerContentInitial: Initial state of the content tree.
 */
export default function FooterEditor({ footerContentInitial }: FooterEditorProps) {
    const [footerContent, setFooterContent] = useState({ content: footerContentInitial, hasChanged: false });
    const globalLocale = useContext(LocaleContext);
    const [footerLocale, setFooterLocale] = useState(globalLocale);

    const [content, dispatch] = useCTReducer({
        content: footerLocale === locales.sv ? footerContent.content.sv : footerContent.content.en,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        postDispatchHook: (action, newState) => {
            setFooterContent({
                content: footerContent.content,
                hasChanged: true
            });
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function saveContent(event: MouseEvent) {
        footerLocale === locales.sv
            ? setFooterContent({
                content: { ...footerContent.content, sv: content as SiteFooterCT },
                hasChanged: false
            }
            )
            : setFooterContent({
                content: { ...footerContent.content, en: content as SiteFooterCT },
                hasChanged: false
            }
            );
    }

    return (
        <Col>
            <Row className={'mb-3 justify-content-between'}>
                <LocaleSelector localeState={footerLocale} setLocaleHook={setFooterLocale} />
                <Button variant="primary" type="submit" disabled={!footerContent.hasChanged}
                    onClick={ saveContent }
                >
                    <i className="fas fa-save" /> Save
                </Button>
            </Row>
            <Row>
                <LocaleContext.Provider value={footerLocale}>
                    <EditorialModeContext.Provider value={true}>
                        {/* eslint-disable @typescript-eslint/no-unused-vars */}
                        <ContentTreeContext.Provider value={dispatch}>
                            <div className="border border-dark col-12 px-0">
                                <Footer content={content as SiteFooterCT}/>
                            </div>
                        </ContentTreeContext.Provider>
                    </EditorialModeContext.Provider>
                </LocaleContext.Provider>
            </Row>
        </Col>
    );
};
