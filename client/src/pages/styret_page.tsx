import React from 'react'
import {ProfileCard, IProfileCard} from "../components/profile-card";
import Container from 'react-bootstrap/Container';
import profile_img_1 from '../placeholder_images/gustav_profilecard.jpg';
import profile_img_2 from '../placeholder_images/morris_profilecard.jpg.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let data : IProfileCard = {
    description : "Hej jag är Gustav!",
    email : "mejl",
    image_url : profile_img_1,
    name : "Gustav",
    role : "kassör",
    year_code : "F-18"
}


function StyretPage() {
    return (
        <Container className="pb-5">
            <h1 className="pb-4">Styret</h1>
            <Row>
            <Col className={"col-9"}>
                <Row className={"pb-4 justify-content-start"}>
                    <Col className={"col-4"}>
                        <ProfileCard {...data}/>
                    </Col>
                    <Col className={"col-4"}>
                        <ProfileCard {...data}/>
                    </Col>
                    <Col className={"col-4"}>
                        <ProfileCard {...data}/>
                    </Col>
                    <Col className={"col-4"}>
                        <ProfileCard {...data}/>
                    </Col>
                </Row>
            </Col>
            <Col className={"col-3"}>

                Temporary side menu
            </Col>


            </Row>

        </Container>
    )
}

export default StyretPage;