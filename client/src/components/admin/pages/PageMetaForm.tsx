import React, { ChangeEvent } from 'react';
import { MinimalPage, Page } from '../../../types/api_object_types';
import { Col, Form } from 'react-bootstrap';
import pageTypeMap from '../../../pages/PageTypeMap';
import { pathToResp } from '../../../mock_data/pages/mock_PageTypeLoader';

export default function PageMetaForm(props: {page: Page, setPageHook: (page: Page) => void}) {
    return (
        <div>
            <Form onSubmit={() => {}}>
                <Form.Group controlId="slug" as={Col} md={4}>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        defaultValue={props.page.slug}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                slug: event.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="pageType" as={Col} md={4}>
                    <Form.Label>Page type</Form.Label>
                    <Form.Control
                        as='select'
                        defaultValue={props.page.pageType}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                pageType: event.target.value
                            });
                        }}
                    >
                        {Object.keys(pageTypeMap).map((pageType, index) => (
                            <option key={index}>{pageType}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="parent" as={Col} md={4}>
                    <Form.Label>Parent page</Form.Label>
                    <Form.Control
                        as='select'
                        defaultValue={props.page.parent.name}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                parent: pathToResp[event.target.value].data as MinimalPage
                            });
                        }}
                    >
                        {Object.entries(pathToResp).map((entry, index) => (
                            <option key={index} value={entry[0]}>{entry[1].data.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}
