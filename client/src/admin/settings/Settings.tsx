import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { APIResponse, Site } from '../../types/api_responses';
import { Button, Col, Form } from 'react-bootstrap';
import callApi from '../call_api_temp';
import { adminMenuItems } from '../Admin';

type FormState<T> = {
    hasChanged: boolean,
    initialData: T,
    currentData: T
}

type SettingsAdminPageState = {
    site: FormState<Site>
}

type FormValues = {
    rootUrl: {
        validated: boolean,

    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(() => {
        const data = (callApi({ path: 'site/', getParams: {} }) as APIResponse<Site>).data;
        return ({ site: { hasChanged: false, initialData: data, currentData: data } });
    });

    async function onSiteFormSubmit() {
        const resp = callApi({ path: 'site/', getParams: {} });
    }

    const [validated, setValidated] = useState(false);

    const onChange = (event: ChangeEvent<any>) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);
        console.log('');
    };

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h2 className="row justify-content-between">
                    <span>Site settings</span>
                    <Button variant="primary" type="submit">
                        <i className="fas fa-save" /> Save
                    </Button>
                </h2>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Root URL"
                            defaultValue="Mark"
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
