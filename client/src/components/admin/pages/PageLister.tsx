import React, { useEffect, useState } from 'react';
import { Form, FormControl, Col, Row, Card } from 'react-bootstrap';
import callApi from '../call_api_temp';
import { APIResponse } from '../../../types/general';
import { Page } from '../../../types/api_object_types';

type PageListerProps = {
    setPagesLocation: (props: NodeJS.Dict<string>) => void;
}

/**
 * Component that lists all pages and allows for filtering and search behaviour.
 * @param setPagesLocation: Hook to be able to change the location within the pages Admin-app.
 */
export default function PageLister({ setPagesLocation }: PageListerProps) {
    const [allPages, setAllPages] = useState<Page[]>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setAllPages((callApi({ path: 'pages/', getParams: {} }) as APIResponse<Page[]>).data);
    }, []);

    const pagesFiltered = searchTerm === '' ? allPages : allPages?.filter(page => page.name.includes(searchTerm));

    return (
        <div className="px-4 pt-4">
            <h1>Sidor</h1>
            <Row className={'mt-5 mb-2 d-flex justify-content-end'}>
                <Form inline className={'col-4'}>
                    <FormControl type="text" placeholder="Search" className={'flex-grow-1'} onChange={
                        (event) => setSearchTerm(event.target.value)
                    }/>
                </Form>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header className={'font-weight-bold border-bottom'}>
                            <Row>
                                <Col xs={6} xl={5}>
                                    Namn
                                </Col>
                                <Col xs={6} xl={3}>
                                    Skapad av
                                </Col>
                                <Col xl={2} className={'d-none d-xl-inline'}>
                                    Senast ändrad
                                </Col>
                                <Col xl={2} className={'d-none d-xl-inline'}>
                                    Antal besökare
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className={'p-0'}>
                            {pagesFiltered?.map((page, index) => {
                                return (
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    <Row
                                        className={'p-3 mx-0' + (
                                            index % 2 === 0 ? ' bg-F-light-gray' : ''
                                        )}
                                        key={index}
                                        onClick={() => setPagesLocation({ id: page.id.toString() })}
                                    >
                                        <Col xs={6} xl={5}>
                                            {page.name}
                                        </Col>
                                        <Col xs={6} xl={3}>
                                            -
                                        </Col>
                                        <Col xl={2} className={'d-none d-xl-inline'}>
                                            {page.lastEditedAt}
                                        </Col>
                                        <Col xl={2} className={'d-none d-xl-inline'}>
                                            -
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
