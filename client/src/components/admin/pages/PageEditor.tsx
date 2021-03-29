import React from 'react';
import { Page } from '../../../types/api_object_types';
import callApi from '../call_api_temp';
import { Button } from 'react-bootstrap';

type PageEditorProps = {
    setPagesLocation: (props: NodeJS.Dict<string>) => void;
    id: string,
    page?: Page,
}

export default function PageEditor({ setPagesLocation, id, page }: PageEditorProps) {
    // If we dont have page data, get page (mock data for now)
    let pageData = page;
    if (pageData === undefined) {
        const resp = callApi({ path: 'pages/' + id + '/', getParams: {} });
        if (resp.code === 200) {
            pageData = resp.data;
        }
    }

    return (
        <div className="px-4 pt-4">
            <h2>Edit page</h2>
            <Button onClick={(event) => setPagesLocation({})} >
                Tillbaka till lista
            </Button>
            {JSON.stringify(pageData)}
        </div>
    );
}
