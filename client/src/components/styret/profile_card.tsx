import React from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import './profile_card.css'

export interface IProfileCard {
    image_url: string,  // image url
    role: string, // Ordförande, Kassör ...
    year_code: string, // F-17, F-18 or similar
    name: string,
    email: string,
    description: string // Short description of person
}

// TODO The styling of the <a> might be able to done without an inner <p> tag. I had difficulties making it having the
// same width as the other <p> tags without it however.
function ProfileCard(personInfo: IProfileCard){
    let image_alt_text = personInfo.role + " " + personInfo.name;
    return (
        <Container>
            <Col>
                <img src={personInfo.image_url} alt={image_alt_text} className={"rounded"} style={{width: "100%"}}/>

                <div className={"pt-3"}>
                    <h5 className={"m-0 profile-card-role"}>{personInfo.role}</h5>
                    <div className={"py-3"}>
                       <p className={"my-0 profile-card-name"}>{personInfo.name}</p>
                       <p className={"my-0"}>{personInfo.year_code}</p>
                       <a className={"profile-card-email"} href={"mailto:" + personInfo.email}>
                           <p className={"my-0"}> {personInfo.email} </p>
                       </a>
                    </div>
                    <p>{personInfo.description}</p>
                </div>
            </Col>
        </Container>

    )
}

export {ProfileCard};
