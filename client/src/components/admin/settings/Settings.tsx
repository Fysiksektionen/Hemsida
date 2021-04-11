import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AdminPageProps } from '../../../types/admin_components';
import { APIResponse } from '../../../types/general';
import { Button, Col, Form } from 'react-bootstrap';
import callApi from '../call_api_temp';
import HeaderEditor from './HeaderEditor';
import { MinimalPage, Site } from '../../../types/api_object_types';
import { SiteFooterContentTree, SiteHeaderContentTree } from '../../../types/content_object_trees';
import FooterEditor from './FooterEditor';

// TODO: Add current state updated onChange
type FormState<T> = {
    hasChanged: boolean,
    initialData: T
}

type SiteSettings = {
    rootUrl: string,
    rootPage: MinimalPage
}

type SiteContents = {
    headerContentSv: SiteHeaderContentTree,
    headerContentEn: SiteHeaderContentTree,
    footerContentSv: SiteFooterContentTree,
    footerContentEn: SiteFooterContentTree
}

type SettingsAdminPageState = {
    settings: FormState<SiteSettings>,
    contents: FormState<SiteContents>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(() => {
        const data = (callApi({ path: 'site/', getParams: {} }) as APIResponse<Site>).data;
        return ({
            settings: { hasChanged: false, initialData: data as SiteSettings },
            contents: { hasChanged: false, initialData: data as SiteContents }
        });
    });

    const [validated, setValidated] = useState(false);

    const onChange = (event: ChangeEvent<any>) => {
        const formControl = event.target;

        formControl.parentNode.classList.add('was-validated');
        if (!state.settings.hasChanged) {
            setState({
                ...state,
                settings: {
                    ...state.settings,
                    hasChanged: true
                }
            });
            console.log(state);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity()) {
            // Do something with data. (Send to server)
        }
        setValidated(true);
        setState({
            ...state,
            settings: {
                ...state.settings,
                hasChanged: false
            }
        });

        // TODO: Call API here

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div>
            <h1>Settings</h1>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h2 className="d-flex flex-row justify-content-between">
                    <span>Site settings</span>
                    <Button variant="primary" type="submit" disabled={!state.settings.hasChanged}>
                        <i className="fas fa-save" /> Save
                    </Button>
                </h2>
                <Form.Group controlId="rootUrl" as={Col} md={4}>
                    <Form.Label>Root URL</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Root URL"
                        defaultValue={state.settings.initialData.rootUrl}
                        onChange={onChange}
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Looks bad!</Form.Control.Feedback>
                </Form.Group>
            </Form>
            <hr />
            <h2>Site content</h2>
            <h3>Header</h3>
            <HeaderEditor
                headerContentInitial={{
                    sv: state.contents.initialData.headerContentSv,
                    en: state.contents.initialData.headerContentEn
                }}
            />
            <hr />
            <h3>Footer</h3>
            <FooterEditor
                footerContentInitial={{
                    sv: state.contents.initialData.footerContentSv,
                    en: state.contents.initialData.footerContentEn
                }}
            />
            <hr />
        </div>
    );
};
