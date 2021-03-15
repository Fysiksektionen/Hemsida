import React from 'react';
import { IProfileCard } from '../components/styret/ProfileCard';
import ProfileCards, { IProfileCards } from '../components/styret/ProfileCardsGrid';
import Container from 'react-bootstrap/Container';
import profileImg1 from '../placeholder_images/gustav_profilecard.jpg';
import profileImg2 from '../placeholder_images/morris_profilecard.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const gustavCard : IProfileCard = {
    description: 'Har huvudansvar för sektionens ekonomi. Bokför även en hel del.',
    email: 'kassor@f.kth.se',
    imageUrl: profileImg1,
    name: 'Gustav von Knorring',
    role: 'Kassör',
    yearCode: 'F-18'
};

const morrisCard : IProfileCard = {
    description: 'Jag leder Styrelsens arbete och är ytterst ansvarig för sektionens verksamhet och att representera den utåt. Mig kan du alltid kontakta om du har frågor!',
    email: 'ordf@f.kth.se',
    imageUrl: profileImg2,
    name: 'Morris Eriksson',
    role: 'Ordförande',
    yearCode: 'F-18'
};

const dummyCards : IProfileCards = {
    cards: [
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard
    ]
};

function StyretPage() {
    return (
        <Container className="pb-5">
            <h1 className="pb-4">Styret</h1>
            <Row>
                <Col className={'col-9'}>
                    <Row className={'pb-4'}>
                        <ProfileCards {...dummyCards}/>
                    </Row>
                </Col>
                <Col className={'col-3'}>
                A side menu might be here some time.
                </Col>

            </Row>

        </Container>
    );
}

export default StyretPage;
