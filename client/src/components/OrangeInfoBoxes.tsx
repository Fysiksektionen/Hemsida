import React, {ReactNode} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Centered from './CenteredText';
import LoremIpsum from './LoremIpsum';
import FButton from './f-styled/buttons/FButton';


const DummyData : InfoBoxProps = {title: "Vill du hitta på något?", text: <LoremIpsum />, button_text: "Engagera dig", bg_color: "orange"}

function OrangeInfoBoxes() {
  return (
    <Row className="m-0">
      <Col className="p-0"> <OrangeInfoBox {...DummyData} bg_color="orange"/> </Col>
      <Col className="p-0"> <OrangeInfoBox {...DummyData} bg_color="orangered"/> </Col>
      <Col className="p-0"> <OrangeInfoBox {...DummyData} bg_color="orange"/> </Col>
    </Row>
  )
}

export default OrangeInfoBoxes;


type InfoBoxProps = {
  title: string,
  text?: ReactNode,
  button_text: string,
  bg_color: string
}

function OrangeInfoBox(props : InfoBoxProps) {
  return (
    <div className="px-5 py-4-5 h-100 text-white" style={{backgroundColor: props.bg_color}}>
      <Centered><h3>{props.title}</h3></Centered>
      {/* I didn't want to make a fixed height, I wanted a dynamic one. But couldn't find a way to put the buttons on the bottom all same height (y-position) */}
      <div className="font-weight-light text-truncate" style={{height: "200px"}}>{props.text}</div>
      <Centered><FButton text={props.button_text}/></Centered>
    </div>
  )
}
