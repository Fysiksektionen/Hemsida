import React from 'react';

function GoogleMap ({ width, height }: { width: string, height: string }) {
    return (
        <iframe
            title="GoogleMapsFrame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.68099231634596!2d18.066644836696618!3d59.353813090190314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x68d5e625a58eea3d!2sFysiksektionen!5e0!3m2!1ssv!2sse!4v1473603506755"
            style={{ width: width, height: height }}
        />
    );
}

export default GoogleMap;
