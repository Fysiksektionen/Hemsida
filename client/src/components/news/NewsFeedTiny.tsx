import React from 'react';
import NewsItemTiny from './NewsItemTiny';
import { NewsPageMinimal } from '../../types/news';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

type NewsFeedTinyProps = {
    items : NewsPageMinimal[]
}

function NewsFeedTiny(props : NewsFeedTinyProps) {
    return (
        <div>
            {props.items.map((item, index) =>
                <Row key={index} className='mb-45 bg-white'>
                    <NewsItemTiny {...item}/>
                </Row>
            )}
            <div className="text-center">
                <Button variant={'secondary'}>Fler nyheter</Button>
            </div>
        </div>
    );
}

export default NewsFeedTiny;
