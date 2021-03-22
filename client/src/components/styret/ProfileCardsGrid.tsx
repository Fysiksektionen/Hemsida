import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ProfileCardInfo, ProfileCard } from './ProfileCard';

function ProfileCards(props: ProfileCardInfo[]) {
    // The sizing of the profile cards depending on screen size will probably have to be experimented more once we are
    // done with the side menu on the styret page.
    return (
        <Row>
            {props.map((cardData, index) =>
                <Col className={'col-lg-4 col-md-6 col-sm-12'} key={index}>
                    <ProfileCard {...cardData}/>
                </Col>
            )}
        </Row>
    );
}

export default ProfileCards;
