import React, { MouseEvent, useContext, useState } from 'react';
import {
    ContentObjectTreeContext,
    EditorialModeContext,
    LocaleContext,
    locales,
    useContentTreeReducer
} from '../../../contexts';
import Header from '../../Header';
import { SiteHeaderContentTree } from '../../../types/content_object_trees';
import { Button, Col, Row } from 'react-bootstrap';
import LocaleSelector from '../../LocaleSelector';

export type HeaderEditorProps = {
    headerContentInitial: {sv: SiteHeaderContentTree, en: SiteHeaderContentTree},
}

/**
 * Component providing editing behaviour of Header component. Uses the ContentTreeReducer and
 * EditorialModeContext to enable the built-it editing behaviour in the Header component.
 * @param headerContentInitial: Initial state of the content tree.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeaderEditor({ headerContentInitial }: HeaderEditorProps) {
    const [headerContent, setHeaderContent] = useState({ content: headerContentInitial, hasChanged: false });
    const globalLocale = useContext(LocaleContext);
    const [headerLocale, setHeaderLocale] = useState(globalLocale);

    const [content, dispatch] = useContentTreeReducer({
        content: headerLocale === locales.sv ? headerContent.content.sv : headerContent.content.en,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        postDispatchHook: (action, newState) => {
            setHeaderContent({
                content: headerContent.content,
                hasChanged: true
            });
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function saveContent(event: MouseEvent) {
        headerLocale === locales.sv
            ? setHeaderContent({
                content: { ...headerContent.content, sv: content as SiteHeaderContentTree },
                hasChanged: false
            }
            )
            : setHeaderContent({
                content: { ...headerContent.content, en: content as SiteHeaderContentTree },
                hasChanged: false
            }
            );
    }

    return (
        <Col>
            <Row className={'mb-3 justify-content-between'}>
                <LocaleSelector localeState={headerLocale} setLocaleHook={setHeaderLocale} />
                <Button variant="primary" type="submit" disabled={!headerContent.hasChanged}
                    onClick={ saveContent }
                >
                    <i className="fas fa-save" /> Save
                </Button>
            </Row>
            <Row>
                <LocaleContext.Provider value={headerLocale}>
                    <EditorialModeContext.Provider value={true}>
                        {/* eslint-disable @typescript-eslint/no-unused-vars */}
                        <ContentObjectTreeContext.Provider value={dispatch}>
                            <div className="border border-dark col-12 px-0">
                                <Header content={content as SiteHeaderContentTree}/>
                            </div>
                        </ContentObjectTreeContext.Provider>
                    </EditorialModeContext.Provider>
                </LocaleContext.Provider>
            </Row>
        </Col>
    );
};
