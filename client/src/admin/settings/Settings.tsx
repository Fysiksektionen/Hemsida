import React, { useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { APIResponse, Site } from '../../types/api_responses';
import { Button } from 'react-bootstrap';
import callApi from '../call_api_temp';

type FormState<T> = {
    hasChanged: boolean,
    initialData: T,
    currentData: T
}

type SettingsAdminPageState = {
    site: FormState<Site>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(() => {
        const data = (callApi({ path: 'site/', getParams: {} }) as APIResponse<Site>).data;
        return ({ site: { hasChanged: false, initialData: data, currentData: data } });
    });

    const siteUpdated = state.site.initialData;

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <h2 className="d-flex flex-row justify-content-between">
                <span>Site settings</span>
                {state.site.initialData && <Button type="submit">Spara site settings</Button>}
            </h2>

            <hr />
        </div>
    );
};
