import '../../index.css';
import {Container, Navbar, Nav} from "react-bootstrap";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import logo from "../../Fysiksektionen_logo.svg";
import {useEffect, useState} from "react";
import FButton from "../../components/f-styled/buttons/FButton";
import {timeoutPromise} from "../../utils/timeoutPromise";
import {FormControlLabel, Switch} from "@material-ui/core";

import './APIDocs.css'; // Removes some elements of the swagger-ui which could not be removed programmatically

type DocsInfo = {
    fileName: string  // Relative server root (without leading slash)
    displayName: string  // Name in menu
}

type APIDocsProps = {
    serverUrl?: string  // full URL with appended slash
    docs?: DocsInfo[]
    timeOut?: number  // ms
    updateInterval?: number
    autoUpdateEnabled?: boolean
}

type APIDocsState = {
    jsonUrl: string
    jsonData: object
    autoUpdateEnabled: boolean
}

function APIDocs({
                     serverUrl="http://localhost:3001/",
                     docs=[
                         {fileName: 'general.json', displayName: 'General'},
                         {fileName: 'website.json', displayName: 'Website'},
                         {fileName: 'authentication.json', displayName: 'Authentication'}
                     ],
                     timeOut=1000,
                     updateInterval=2500,
                     autoUpdateEnabled=false
                 }: APIDocsProps) {

    const [state, setState] = useState({
        jsonUrl: serverUrl,
        jsonData: {},
        autoUpdateEnabled: autoUpdateEnabled
    } as APIDocsState);

    const updateAPIData = async function(jsonUrl: string) {
        if (jsonUrl !== "") {
            const res = await timeoutPromise(
                fetch(jsonUrl).then(response => response.json()),
                timeOut
            ).catch(reason => {
                console.log(`Request on ${jsonUrl}: ${reason.message}`);
            });
            if (res) {
                if( JSON.stringify(res) !== JSON.stringify(state.jsonData) ) {
                    setState({
                        jsonUrl: jsonUrl,
                        jsonData: res,
                        autoUpdateEnabled: state.autoUpdateEnabled
                    });
                }
            }
        }
    }

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if( state.autoUpdateEnabled ) {
                updateAPIData(state.jsonUrl).then();
            }
        }, updateInterval);

        return () => {clearInterval(intervalId)}
    });

    return (
        <div>
            <Navbar variant="light" expand="md" className="border-bottom border-dark">
                <Navbar.Brand>
                    <div className="container-fluid">
                        <a href="/"><img src={logo} width="75" height="75" alt="" className="mx-3" /></a>
                        Fysiksektionens API-docs
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav justify onSelect={(eventKey) => {
                        if( eventKey != null ) {
                            updateAPIData(serverUrl + eventKey).then();
                        }
                    }}>
                        {docs.map((docsInfo) => {
                            return(
                                <Nav.Link eventKey={docsInfo.fileName}>
                                    {docsInfo.displayName}
                                </Nav.Link>
                            )
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid="lg">
                <Row className="my-3 d-flex justify-content-center">
                    <Col xs={10} className="d-flex justify-content-around">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.autoUpdateEnabled}
                                    onChange={(event, checked) => {
                                        setState({...state, autoUpdateEnabled: checked})
                                    }}
                                />
                            }
                            label="Automatic updates"
                        />
                        <FButton text="Run manual update" version="dark" onClick={() => updateAPIData(state.jsonUrl)} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={JSON.stringify(state.jsonData) === JSON.stringify({}) ? "d-none" : ""}>
                        <SwaggerUI
                            url={state.jsonUrl}
                            spec={state.jsonData}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default APIDocs;