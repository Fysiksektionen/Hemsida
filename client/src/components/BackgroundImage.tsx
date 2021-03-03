
import React from 'react';

export type BackgroundImageProps = {
    image: string,
    // sizeToFit: sqeeze image to fit the container
    // sizeKeepAspect: Keeps image aspect ratio, but leaves empty space in the container
    // cover: Keeps image aspect ratio, but zooms in on the image to fill the container
    mode: "sizeToFit" | "sizeKeepAspect" | "cover",
    containerAspectRatio: number //  9.0/16.0
}

function BackgroundImage(props: BackgroundImageProps & React.HTMLAttributes<HTMLDivElement>) {
    // define the style based on the props
    const divStyle = {
        paddingTop: `${props.containerAspectRatio * 100}%`,
        backgroundImage: `url(${props.image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
    }
    if(props.mode == "sizeKeepAspect") {
        divStyle.backgroundSize = "contain";
    }
    else if(props.mode == "sizeToFit") {
        divStyle.backgroundPosition = "0% 0%";
        divStyle.backgroundSize = "100% 100%";
    }


    return (
        <div className="position-relative">
            <div style={divStyle}>
                <div className="position-absolute h-100" style={{top: 0}}>
                    <div className="position-relative h-100">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
  
}


export default BackgroundImage;
