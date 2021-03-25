import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { APIResponse, Site } from '../../types/api_responses';
import { Button, Col, Form } from 'react-bootstrap';
import callApi from '../call_api_temp';

// TODO: Add current state updated onChange
type FormState<T> = {
    hasChanged: boolean,
    initialData: T
}

type SettingsAdminPageState = {
    site: FormState<Site>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(() => {
        const data = (callApi({ path: 'site/', getParams: {} }) as APIResponse<Site>).data;
        return ({ site: { hasChanged: false, initialData: data } });
    });

    async function onSiteFormSubmit() {
        const resp = callApi({ path: 'site/', getParams: {} });
    }

    const [validated, setValidated] = useState(false);

    const onChange = (event: ChangeEvent<any>) => {
        const formControl = event.target;

        formControl.parentNode.classList.add('was-validated');
        if (!state.site.hasChanged) {
            console.log('setting new state');
            setState({
                site: {
                    ...state.site,
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
            site: {
                ...state.site,
                hasChanged: false
            }
        });

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h2 className="row justify-content-between">
                    <span>Site settings</span>
                    <Button variant="primary" type="submit" disabled={!state.site.hasChanged}>
                        <i className="fas fa-save" /> Save
                    </Button>
                </h2>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Root URL</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Root URL"
                            defaultValue={state.site.initialData.rootUrl}
                            onChange={onChange}
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Looks bad!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
            </Form>
            <hr />
        </div>
    );
};
