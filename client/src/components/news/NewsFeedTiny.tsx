import React from 'react';
import NewsItemTiny from './NewsItemTiny';
import Container from 'react-bootstrap/Container';
import { NewsPageMinimal } from '../../types/news';
import Button from 'react-bootstrap/Button';

type NewsFeedTinyProps = {
    items : NewsPageMinimal[]
}

function NewsFeedTiny(props : NewsFeedTinyProps) {
    const tinyFeed = props.items.map((item, index) =>
        <li key={index} className="mb-3" style={{ backgroundColor: '#f0f0f0' }}>
            <NewsItemTiny {...item}/>
        </li>
    );

    return (
        <Container>
            <ul className="list-unstyled">
                {tinyFeed}
            </ul>
            <div className="text-center">
                <Button variant={'secondary'}>Fler nyheter</Button>
            </div>
        </Container>
    );
}

export default NewsFeedTiny;
