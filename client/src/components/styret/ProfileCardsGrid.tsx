import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ProfileCardInfo, ProfileCard } from './ProfileCard';

type ProfileCardsProps = {
    cards: ProfileCardInfo[]
}

function ProfileCards({ cards }: ProfileCardsProps) {
    // The sizing of the profile cards depending on screen size will probably have to be experimented more once we are
    // done with the side menu on the styret page.
    return (
        <Row>
            {cards.map((cardData, index) =>
                <Col lg={4} md={6} sm={12} key={index}>
                    <ProfileCard {...cardData}/>
                </Col>
            )}
        </Row>
    );
}

export default ProfileCards;
