import React from 'react';
import NewsItemCompact from './news_item_compact'
import {INewsItem} from './news_item'
import NewsFeedTiny, {INewsFeedTiny} from './news_feed_tiny'
import news_placeholder from '../../placeholder_images/news_placeholder.jpg';
import news_placeholder_image1 from '../../placeholder_images/news_placeholder1.jpg';
import news_placeholder_image2 from '../../placeholder_images/news_placeholder2.jpg';
import news_placeholder_image3 from '../../placeholder_images/news_placeholder3.jpg';


interface INewsWidget {

}

// TODO: remove
const DummyData : INewsFeedTiny = {items: [
  { thumbnail: news_placeholder_image1,
    title: "Nyhet om fem unga fysiker som sitter och sjunger",
    published: new Date("2021-01-01")
  },
  { thumbnail: news_placeholder_image2,
    title: "Nyhet om fem unga fysiker som sitter och sjunger",
    published: new Date("2021-01-02")
  },
  { thumbnail: news_placeholder_image3,
    title: "En nyhet som ingen kommer att läsa",
    published: new Date("2021-01-03")
  },
]}

export const DummyData2 : INewsItem = {
  image: news_placeholder,
  title: "Det blir en mottagning",
  published: new Date("2021-01-04"),
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}


function NewsWidget(props : INewsWidget) {
  return (
    <div className="" style={{display: "flex"}}>
        <NewsItemCompact {...DummyData2}/>
        <NewsFeedTiny {...DummyData}/>
    </div>
  )
}

export default NewsWidget;
