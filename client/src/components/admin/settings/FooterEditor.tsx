import React, { MouseEvent, useContext, useState } from 'react';
import {
    ContentObjectTreeContext,
    EditorialModeContext,
    LocaleContext,
    locales,
    useContentTreeReducer
} from '../../../contexts';
import Footer from '../../Footer';
import { SiteFooterContentTree } from '../../../types/content_object_trees';
import { Button, Col, Row } from 'react-bootstrap';
import LocaleSelector from '../../LocaleSelector';

export type FooterEditorProps = {
    footerContentInitial: {sv: SiteFooterContentTree, en: SiteFooterContentTree},
}

/**
 * Component providing editing behaviour of Footer component. Uses the ContentTreeReducer and
 * EditorialModeContext to enable the built-it editing behaviour in the Footer component.
 * @param footerContentInitial: Initial state of the content tree.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FooterEditor({ footerContentInitial }: FooterEditorProps) {
    const [footerContent, setFooterContent] = useState({ content: footerContentInitial, hasChanged: false });
    const globalLocale = useContext(LocaleContext);
    const [footerLocale, setFooterLocale] = useState(globalLocale);

    const [content, dispatch] = useContentTreeReducer({
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
                content: { ...footerContent.content, sv: content as SiteFooterContentTree },
                hasChanged: false
            }
            )
            : setFooterContent({
                content: { ...footerContent.content, en: content as SiteFooterContentTree },
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
                        <ContentObjectTreeContext.Provider value={dispatch}>
                            <div className="border border-dark col-12 px-0">
                                <Footer content={content as SiteFooterContentTree}/>
                            </div>
                        </ContentObjectTreeContext.Provider>
                    </EditorialModeContext.Provider>
                </LocaleContext.Provider>
            </Row>
        </Col>
    );
};
