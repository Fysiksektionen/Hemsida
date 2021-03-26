import React, { useContext, useState } from 'react';
import { ContentObjectTreeProvider, EditorialModeContext, LocaleContext, locales } from '../../contexts';
import Header from '../../components/Header';
import { SiteHeaderContentTree } from '../../types/constent_object_trees';
import { Button, Col, Row } from 'react-bootstrap';
import LocaleSelector from '../../components/LocaleSelector';

// TODO: Replace with contentObject types
export type HeaderEditorProps = {
    headerContent: {sv: SiteHeaderContentTree, en: SiteHeaderContentTree},
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeaderEditor({ headerContent }: HeaderEditorProps) {
    const [contentHasChanged, setContentHasChanged] = useState(false);
    const globalLocale = useContext(LocaleContext);
    const [headerLocale, setHeaderLocale] = useState(globalLocale);

    return (
        <Col>
            <Row className={'mb-3 justify-content-between'}>
                <LocaleSelector localeState={headerLocale} setLocaleHook={setHeaderLocale} />
                <Button variant="primary" type="submit" disabled={!contentHasChanged}>
                    <i className="fas fa-save" /> Save
                </Button>
            </Row>
            <Row>
                <LocaleContext.Provider value={headerLocale}>
                    <EditorialModeContext.Provider value={true}>
                        {/* eslint-disable @typescript-eslint/no-unused-vars */}
                        <ContentObjectTreeProvider
                            state={headerLocale === locales.sv ? headerContent.sv : headerContent.en}
                            postDispatchHook={(action, newState) => { setContentHasChanged(true); }}
                        >
                            <div className="border border-dark col">
                                <Header content={headerLocale === locales.sv ? headerContent.sv : headerContent.en}/>
                            </div>
                        </ContentObjectTreeProvider>
                    </EditorialModeContext.Provider>
                </LocaleContext.Provider>
            </Row>
        </Col>
    );
};
