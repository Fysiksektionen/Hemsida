import React from 'react';
import NewsItemCompact from './NewsItemCompact'
import {INewsItem} from './NewsItem'
import NewsFeedTiny, {INewsFeedTiny} from './NewsFeedTiny'
import news_placeholder from '../../placeholder_images/news_placeholder.jpg';
import news_placeholder_image1 from '../../placeholder_images/news_placeholder1.jpg';
import news_placeholder_image2 from '../../placeholder_images/news_placeholder2.jpg';
import news_placeholder_image3 from '../../placeholder_images/news_placeholder3.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
// TODO: remove
export const DummyData2 : INewsItem = {
  image: news_placeholder,
  title: "Det blir en mottagning",
  published: new Date("2021-01-04"),
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}


function NewsWidget(props : INewsWidget) {
  return (
    <div>
      <h1 className="pl-2 mb-4">Nyheter</h1>
      <Container>
        <Row>
          <Col className="col-7 pr-0"> <NewsItemCompact {...DummyData2}/> </Col>
          <Col className="col-5 pl-0"> <NewsFeedTiny {...DummyData}/> </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NewsWidget;
