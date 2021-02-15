import React from 'react'

type ProfileCardProps = {
    image_url: string,  // image url
    role: string, // Ordförande, Kassör ...
    year_code: string, // F-17, F-18 or similar
    name: string,
    email: string,
    description: string // Short description of person
}

function ProfileCard(personInfo: ProfileCardProps){
    let image_alt_text = personInfo.role + " " + personInfo.name;
    return (
        <div className={"container"}>
                <img src={"https://www.w3schools.com/html/pic_trulli.jpg"} alt={image_alt_text} style={{width: "100%"}}/>
                <h1>{personInfo.role}</h1>
                <h2>{personInfo.name}</h2>
                <h3>{personInfo.description}</h3>
        </div>
    )
}

export default ProfileCard;