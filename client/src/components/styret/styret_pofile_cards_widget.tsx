import React from 'react'
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import {IProfileCard, Profile_card} from './profile_card'

export interface IProfileCards {
    cards: IProfileCard[]
}

function ProfileCards(props: IProfileCards){

    // The sizing of the profile cards depending on screen size will probably have to be experimented more once we are
    // done with the side menu on the styret page.
    return (
        <Row>
            {props.cards.map((cardData) =>
                <Col className={"col-lg-4 col-md-6 col-sm-12"}>
                    <Profile_card {...cardData}/>
                </Col>
            )}
        </Row>
    )
}

export {ProfileCards}