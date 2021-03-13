import React, {ReactNode} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CenteredText as Centered} from './Centered';
import LoremIpsum from './LoremIpsum';
import FButton from './f-styled/buttons/FButton';


const DummyData1 : InfoSingleBoxProps = {title: "Vill du hitta på något?", text: <LoremIpsum />, button_text: "Engagera dig", bg_color: "orangered"}
const DummyData2 : InfoSingleBoxProps = {title: "Vill du hitta på något?", text: <LoremIpsum />, button_text: "Engagera dig", bg_color: "crimson"}
export const DummyData : InfoBoxesProps = {boxes: [DummyData1, DummyData2, DummyData1]}

type InfoBoxesProps = {
  boxes: [InfoSingleBoxProps, InfoSingleBoxProps, InfoSingleBoxProps]
}

type InfoSingleBoxProps = {
  title: string,
  text?: ReactNode,
  button_text: string,
  bg_color: string
}

export default function OrangeInfoBoxes({boxes}: InfoBoxesProps) {
  // Could use map(), but it is fixed length so it doesn't matter.
  return (
    <Row className="m-0 text-white">
      <Row className="m-0">
        <Col className="p-0"> <OrangeInfoBoxText {...boxes[0]}/> </Col>
        <Col className="p-0"> <OrangeInfoBoxText {...boxes[1]}/> </Col>
        <Col className="p-0"> <OrangeInfoBoxText {...boxes[2]}/> </Col>
      </Row>
      <Row className="m-0 w-100">
        <Col className="p-0"> <OrangeInfoBoxButton {...boxes[0]}/> </Col>
        <Col className="p-0"> <OrangeInfoBoxButton {...boxes[1]}/> </Col>
        <Col className="p-0"> <OrangeInfoBoxButton {...boxes[2]}/> </Col>
      </Row>
    </Row>
  )
}


function OrangeInfoBoxText(props : InfoSingleBoxProps) {
  return (
    <div className="px-xl-5 px-lg-4 pt-4-5 h-100" style={{backgroundColor: props.bg_color}}>
      <Centered><h3>{props.title}</h3></Centered>
      <div className="font-weight-light">{props.text}</div>
    </div>
  )
}

function OrangeInfoBoxButton(props : InfoSingleBoxProps) {
  return (
    <div className="pb-4-5" style={{backgroundColor: props.bg_color}}>
      <Centered><FButton text={props.button_text}/></Centered>
    </div>
  )
}
