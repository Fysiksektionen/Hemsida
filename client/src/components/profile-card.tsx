import React from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export interface IProfileCard {
    image_url: string,  // image url
    role: string, // Ordförande, Kassör ...
    year_code: string, // F-17, F-18 or similar
    name: string,
    email: string,
    description: string // Short description of person
}

function ProfileCard(personInfo: IProfileCard){
    let image_alt_text = personInfo.role + " " + personInfo.name;
    return (
        <Container>
            <Col>
                <img src={personInfo.image_url} alt={image_alt_text} className={"rounded"} style={{width: "100%"}}/>
                <div className={"pt-4"}>
                    <h4>{personInfo.role}</h4>
                    <h4>{personInfo.name}</h4>
                    <p>{personInfo.description}</p>
                </div>
            </Col>
        </Container>

    )
}

export {ProfileCard};
