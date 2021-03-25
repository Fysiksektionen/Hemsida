import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { APIResponse, Site, SiteContents, SiteSettings } from '../../types/api_responses';
import { Button, Col, Form } from 'react-bootstrap';
import callApi from '../call_api_temp';
import Footer from '../../components/Footer';
import HeaderEditor, { HeaderEditorProps } from './HeaderEditor';

// TODO: Add current state updated onChange
type FormState<T> = {
    hasChanged: boolean,
    initialData: T
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
            console.log('setting new state');
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
            console.log('Updated!');
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

    function updateHeaderContentStateHook(args: { sv: object, en: object }) {
        setState({
            ...state,
            contents: {
                ...state.contents,
                initialData: {
                    ...state.contents.initialData,
                    bannerContentSv: args.sv,
                    bannerContentEn: args.en
                }
            }
        });
    }

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h2 className="row justify-content-between">
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
            <h2 className="row justify-content-between">
                <span>Site content</span>
                <Button variant="primary" type="submit" disabled={!state.contents.hasChanged}>
                    <i className="fas fa-save" /> Save
                </Button>
            </h2>
            <h3>Header</h3>
            <HeaderEditor
                headerContent={{
                    sv: state.contents.initialData.bannerContentSv,
                    en: state.contents.initialData.bannerContentEn
                }}
                updateHeaderContentStateHook={updateHeaderContentStateHook}
            />
            <hr />
            <h3>Footer</h3>
            <div className="border border-dark">
                <Footer contentSv={{}} contentEn={{}}/>
            </div>
            <hr />
        </div>
    );
};
