import React from 'react';
import Banner from '../components/Banner';
import OrangeInfoBoxes, {DummyData} from '../components/OrangeInfoBoxes';
import NewsWidget from '../components/news/FrontpageNewsWidget';
import { AccountBalance } from '@material-ui/icons';
import FDateButton from '../components/f-styled/buttons/FDateButton';
import FLargeIconButton from '../components/f-styled/buttons/FLargeIconButton';
import { PageComponentProps } from '../types/general';

import placeholder from '../placeholder_images/placeholder.jpg'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Frontpage(props: PageComponentProps) {
    return (
        <div>
            <Banner image={placeholder} mainText="Fysiksektionen" bottomText="Aaaaaaaa"/>
            <OrangeInfoBoxes {...DummyData}/>
            <div style={{height: "50px"}}/>
            <div className="p-5"><NewsWidget /></div>
            <div style={{height: "100px"}}/>
            <div
                className="px-4 my-4"
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <FDateButton text="Namn på möte" date="1997-10-10"/>
                <FDateButton text="Namn på möte" date="1997-10-10" version="dark"/>
            </div>
            <div
                className="px-4 my-4"
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <FLargeIconButton text="Budget" Icon={AccountBalance}/>
            </div>
        </div>
    )
}

export default Frontpage;
