import placeholder from '../mediafiles/placeholder_images/placeholder.jpg';
import React from 'react';
import { Image } from 'react-bootstrap';

function Banner() {
    // TODO: Temporary, should be improved in another branch
    return (
        <div className="" style={{}}>
            <Image fluid={true} src={placeholder} style={{ marginTop: '50px' }} alt=''/>
        </div>
    );
}

export default Banner;
