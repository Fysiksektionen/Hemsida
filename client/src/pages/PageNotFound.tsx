import React from 'react';
import { Container } from 'react-bootstrap';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default function PageNotFound() {
    /**
     * Displays a "404 not found" message. Currently only in swedish.
     * **/

    return (
        <Container className="text-center my-5">
            <SentimentVeryDissatisfiedIcon className="my-3" style={{ fontSize: '8rem' }}/>

            <h1>404</h1>
            <h4 className="text-black-50 mb-4">Sidan hittades ej</h4>

            <p>
                Tyvärr hittades inte någon sida på <a href={window.location.href}>{window.location.href}</a>.
            </p>
        </Container>
    );
}
