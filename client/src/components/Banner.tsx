import placeholder from '../placeholder_images/placeholder.jpg'
import React from 'react';
import BackgroundImage from './BackgroundImage'

function Banner() {
    return (
        <BackgroundImage image={placeholder} mode="sizeToFit" containerAspectRatio={8/16} className="container">
            {/*  Test text  */}
            <h1>Hello World</h1>
            <div className="position-absolute" style={{bottom: 0}}>
              aaaaaaa
            </div>
        </BackgroundImage>
    )
}

export default Banner;
