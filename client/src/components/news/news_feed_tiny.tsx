import React from 'react';
import NewsItemTiny, {INewsItemTiny} from './news_item_tiny';
import Button, {IButton} from '../button';

export interface INewsFeedTiny {
  items : INewsItemTiny[]
}


// TODO: remove
const DummyData : IButton = {color: "blue", text: "Fler nyheter"}

function NewsFeedTiny(props : INewsFeedTiny) {
  return (
    <div className="" style={{}}>
      { props.items.map(item => <NewsItemTiny {...item}/>) }
      <Button {...DummyData}/>
    </div>
  )
}

export default NewsFeedTiny;
