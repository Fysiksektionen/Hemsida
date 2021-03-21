import React from 'react';
import { IProfileCard } from '../components/styret/ProfileCard';
import ProfileCards, { IProfileCards } from '../components/styret/ProfileCardsGrid';
import Container from 'react-bootstrap/Container';
import profileImg1 from '../placeholder_images/gustav_profilecard.jpg';
import profileImg2 from '../placeholder_images/morris_profilecard.jpg';
import Row from 'react-bootstrap/Row';
import { IMenuItem, SidebarMenu } from '../components/SidebarMenu';
import { HEADER_HEIGHT } from './NewsFeedPage';

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
    const menuItems: IMenuItem[] = [
        {
            id: 'styret',
            title: 'Styret',
            refsTo: 'styret-header'
        },
        {
            id: 'veckobrev',
            title: 'Styrets veckobrev',
            refsTo: 'styret-veckobrev'
        }
    ];

    return (
        <SidebarMenu menuItems={menuItems}>
            <Container className="pb-5">
                <h1
                    id="styret-header"
                    className="pb-4"
                    style={{ scrollMarginTop: HEADER_HEIGHT }}
                >
                    Styret
                </h1>
                <Row className={'pb-4'}>
                    <ProfileCards {...dummyCards}/>
                </Row>
                <Row
                    id="styret-veckobrev"
                    style={{ scrollMarginTop: HEADER_HEIGHT }}
                >
                    <h1>
                        Styrets veckobrev
                    </h1>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, deleniti quas dolorem dolores repellat aperiam eum aut. Libero ipsa autem dolorem, atque minus, dolor dolore quis illo omnis aperiam fugit?
                    </div>
                </Row>
            </Container>
        </SidebarMenu>
    );
}

export default StyretPage;
