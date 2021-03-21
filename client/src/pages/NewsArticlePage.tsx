import React from 'react';
import NewsArticle, { INewsItem } from '../components/news/NewsItem';
import MenuMonths from '../components/MenuMonths';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageData } from '../components/PageTypeLoader';

function NewsArticlePage(pageData: PageData) {
    return (
        <Container className="pb-5">
            <h1 className="pb-4">Nyheter</h1>
            <Row>
                <Col className="col-7 ml-5"> <NewsArticle {...(pageData.content as INewsItem)}/> </Col>
                <Col className="col-2 ml-5"> <MenuMonths /> </Col>
            </Row>
        </Container>
    );
}
export default NewsArticlePage;
