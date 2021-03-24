import React, { useState } from 'react';
import { AdminPageProps } from '../../types/admin_components';
import { Site } from '../../types/api_responses';
import { Button } from 'react-bootstrap';

type FormState<T> = {
    hasChanged: boolean,
    initialData: T,
    currentData: T
}

type SettingsAdminPageState = {
    site: FormState<any>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SettingsAdminPage(props: AdminPageProps) {
    const [state, setState] = useState<SettingsAdminPageState>(
        {
            site: { hasChanged: false, initialData: '', currentData: '' }
        }
    );

    const siteUpdated = state.site.initialData;

    return (
        <div className="px-4 pt-4">
            <h1>Settings</h1>
            <hr />
            <h2 className="d-flex flex-row justify-content-between">
                <span>Site settings</span>
                {state.site.initialData && <Button type="primary">Spara site settings</Button>}
            </h2>

            <hr />
        </div>
    );
};
