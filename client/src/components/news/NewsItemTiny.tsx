import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export interface INewsItemTiny {
  thumbnail: string
  title: string
  published: Date
}

function NewsItemTiny(props : INewsItemTiny) {
  // I tried using <Media>, it is great but it doesn't have a proper relative postion anchor.
  // This works just fine as well, just not as pretty code-wise. 
  return (
    <Container>
      <Row>
        <Col className="col-5 pl-0">
          <img src={props.thumbnail} width={150} alt='' />
        </Col>
        <Col className="col-7 pt-2 pl-0">
          <h6>{props.title}</h6>
          <small className="position-absolute" style={{bottom: "0.5rem"}}>{props.published.toLocaleDateString()}</small>
        </Col>
      </Row>
    </Container>
  )
}

export default NewsItemTiny;
