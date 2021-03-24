import React, { useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { Site } from '../../types/api_responses';
import { Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import callApi from '../call_api_temp';

type FormState<T> = {
    hasChanged: boolean,
    initialData?: T,
    currentData?: T
}

type SettingsAdminPageState = {
    site: FormState<Site>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(
        {
            site: { hasChanged: false }
        }
    );

    async function onSiteFormSubmit() {
        const resp = callApi({path: 'site/', getParams: {}});
    }

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <Form onSubmit={onSiteFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <h2 className="d-flex flex-row justify-content-between">
                            <span>Site settings</span>
                            {state.site.hasChanged && <Button type="primary" > Spara site settings</>}
                        </h2>
                        <div>
                            Field
                        </div>
                    </form>
                )}
            />
            <hr />
        </div>
    );
};
