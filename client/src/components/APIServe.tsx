import FButton from "./f-styled/buttons/FButton";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {useState} from "react";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

type APIServeProps = {
    url: string
}

function APIServe(props: APIServeProps) {
    const [jsonData, setJsonData] = useState();

    const url = props.url;
    const updateAPIData = async function() {
        console.log("run");
        const res = await fetch(url).then(response => response.json());
        setJsonData(res);
    }
    return (
        <Row className={'justify-content-center'}>
            <Col md={11} lg={9} xl={7} className={'justify-content-center'}>
                <Row className={'justify-content-center'}>
                    <Col>
                        <FButton version="dark" text="Update" onClick={updateAPIData}/>
                    </Col>
                </Row>
                <Row>
                    <SwaggerUI spec={jsonData}/>
                </Row>
            </Col>
        </Row>
    )
}

export default APIServe;