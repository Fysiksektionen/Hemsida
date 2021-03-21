import React from 'react';
import NewsItemTiny, { INewsItemTiny } from './NewsItemTiny';
import SomeButton, { IButton } from '../Button';
import Container from 'react-bootstrap/Container';

export interface INewsFeedTiny {
  items : INewsItemTiny[]
}

// TODO: remove
const DummyData : IButton = { type: 'secondary', text: 'Fler nyheter' };

function NewsFeedTiny(props : INewsFeedTiny) {
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
                <SomeButton {...DummyData}/>
            </div>
        </Container>
    );
}

export default NewsFeedTiny;
