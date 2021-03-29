import React, { ReactNode } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CenteredText as Centered } from './Centered';
import LoremIpsum from './LoremIpsum';
import FButton from './f-styled/buttons/FButton';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DummyData1 : InfoSingleBoxProps = { title: 'Vill du hitta på något?', text: <LoremIpsum />, buttonText: 'Engagera dig', bgColor: 'orangered' };
const DummyData2 : InfoSingleBoxProps = { title: 'Vad händer nu?', text: <LoremIpsum />, buttonText: 'Engagera dig', bgColor: 'crimson' };
export const DummyData : InfoBoxesProps = { boxes: [DummyData1, DummyData2, DummyData1] };

type InfoSingleBoxProps = {
  title: string,
  text?: ReactNode,
  buttonText: string,
  bgColor: string
}

function OrangeInfoBoxText(props : InfoSingleBoxProps) {
    return (
        <div className="px-xxl-5 px-xl-4 px-lg-3 pt-xxl-45 pt-xl-4 h-100" style={{ backgroundColor: props.bgColor }}>
            <Centered><h3>{props.title}</h3></Centered>
            <div className="font-weight-light">{props.text}</div>
        </div>
    );
}

function OrangeInfoBoxButton(props : InfoSingleBoxProps) {
    return (
        <div className="pb-xxl-45 pb-xl-4" style={{ backgroundColor: props.bgColor }}>
            <Centered><FButton text={props.buttonText}/></Centered>
        </div>
    );
}

function SingleAccordionInfo(props : InfoSingleBoxProps) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h4 className="m-auto p-1">{props.title}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    {props.text}
                    <Centered><FButton text={props.buttonText} version="dark"/></Centered>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

function AccordionsInfoLG({ boxes }: InfoBoxesProps) {
    // Could use map(), but it is fixed length so it doesn't matter.
    return (
        <div>
            <SingleAccordionInfo {...boxes[0]}/>
            <SingleAccordionInfo {...boxes[1]}/>
            <SingleAccordionInfo {...boxes[2]}/>
        </div>
    );
}

function OrangeInfoBoxesXL({ boxes }: InfoBoxesProps) {
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
    );
}

type InfoBoxesProps = {
    boxes: [InfoSingleBoxProps, InfoSingleBoxProps, InfoSingleBoxProps]
}

export default function OrangeInfoBoxes({ boxes }: InfoBoxesProps) {
    return (
        <div>
            <div className="d-none d-xl-block">
                <OrangeInfoBoxesXL boxes={boxes}/>
            </div>
            <div className="d-xl-none">
                <AccordionsInfoLG boxes={boxes}/>
            </div>
        </div>
    );
}
