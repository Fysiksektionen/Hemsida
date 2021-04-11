import React from 'react';
import ProfileCards from '../components/styret/ProfileCardsGrid';
import Row from 'react-bootstrap/Row';
import { MenuItem, SidebarMenu } from '../components/SidebarMenu';
import { HEADER_HEIGHT } from './NewsFeedPage';
import { dummyCards } from '../mock_data/mock_StyretPage';
import { ContentObject } from '../types/api_object_types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StyretPage(props: ContentObject) {
    const menuItems: MenuItem[] = [
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
            <div className="pb-5">
                <h1
                    id="styret-header"
                    className="pb-4"
                    style={{ scrollMarginTop: HEADER_HEIGHT }}
                >
                    Styret
                </h1>
                <Row className={'pb-4'}>
                    <ProfileCards cards={dummyCards}/>
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
            </div>
        </SidebarMenu>
    );
}

export default StyretPage;
