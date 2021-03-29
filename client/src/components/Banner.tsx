import React from 'react';
import BackgroundImage from './BackgroundImage';
import { CenteredText, CenteredAbsolute } from './Centered';

function MainText({ mainText }: {mainText: string}) {
    return (
        <CenteredAbsolute><h1>{mainText}</h1></CenteredAbsolute>
    );
}

function BottomText({ bottomText }: {bottomText: string}) {
    return (
        <div className="position-absolute w-100 p-05" style={{ bottom: 0, backgroundColor: 'rgba(40, 40, 40, 0.5)' }}>
            {bottomText}
        </div>
    );
}

type BannerProps = {
    image: string,
    mainText: string,
    bottomText: string
}

export default function Banner(props: BannerProps) {
    return (
        <BackgroundImage image={props.image} mode="sizeToFit" containerAspectRatio={7.5 / 16} className="text-white">
            <CenteredText>
                <MainText mainText={props.mainText}/>
                <BottomText bottomText={props.bottomText}/>
            </CenteredText>
        </BackgroundImage>
    );
}
