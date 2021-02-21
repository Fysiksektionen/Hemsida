import React from 'react'
import {IProfileCard} from "../components/styret/profile_card";
import {IProfileCards, ProfileCards} from '../components/styret/styret_pofile_cards_widget'
import Container from 'react-bootstrap/Container';
import profile_img_1 from '../placeholder_images/gustav_profilecard.jpg';
import profile_img_2 from '../placeholder_images/morris_profilecard.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function StyretPage() {
    return (
        <Container className="pb-5">
            <h1 className="pb-4">Styret</h1>
            <Row>
            <Col className={"col-9"}>
                <Row className={"pb-4"}>
                    <ProfileCards {...dummyCards}/>
                </Row>
            </Col>
            <Col className={"col-3"}>
                A side menu might be here some time.
            </Col>


            </Row>

        </Container>
    )
}

export default StyretPage;


const gustavCard : IProfileCard = {
    description: "Har huvudansvar för sektionens ekonomi. Bokför även en hel del.",
    email: "kassor@f.kth.se",
    image_url: profile_img_1,
    name: "Gustav von Knorring",
    role: "Kassör",
    year_code: "F-18"
}

const morrisCard : IProfileCard = {
    description: "Jag leder Styrelsens arbete och är ytterst ansvarig för sektionens verksamhet och att representera den utåt. Mig kan du alltid kontakta om du har frågor!",
    email: "ordf@f.kth.se",
    image_url: profile_img_2,
    name: "Morris Eriksson",
    role: "Ordförande",
    year_code: "F-18"
}

let dummyCards : IProfileCards = { cards :[
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard,
   ]
}
