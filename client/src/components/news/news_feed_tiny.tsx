import React from 'react';
import NewsItemTiny, {INewsItemTiny} from './news_item_tiny';
import SomeButton, {IButton} from '../button';
import Container from 'react-bootstrap/Container';


export interface INewsFeedTiny {
  items : INewsItemTiny[]
}


// TODO: remove
const DummyData : IButton = {type: "secondary", text: "Fler nyheter"}


function NewsFeedTiny(props : INewsFeedTiny) {
  return (
    <Container>
      <ul className="list-unstyled">
        { props.items.map(item => <NewsItemTiny {...item}/>) }
      </ul>
      <div className="text-center">
        <SomeButton {...DummyData}/>
      </div>
    </Container>
  )
}

export default NewsFeedTiny;
