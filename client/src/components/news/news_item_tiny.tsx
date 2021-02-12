import React from 'react';

export interface INewsItemTiny {
  thumbnail: string
  title: string
  published: Date
}

function NewsItemTiny(props : INewsItemTiny) {
  return (
    <div className="" style={{width: "400px", marginBottom: "1em", display: "flex", backgroundColor: "#f0f0f0"}}>
      <div style={{width: "150px"}}>
        <img src={props.thumbnail} style={{width: "100%"}} />
      </div>
      <div style={{width: "250px", paddingLeft: "10px", paddingTop: "2px", position: "relative"}}>
        <h6>{props.title}</h6>
        <small style={{display: "inline", position: "absolute", bottom: 0, right: 0, marginBottom: "3px", marginRight: "4px"}}>{props.published.toLocaleDateString()}</small>
      </div>
    </div>
  )
}

export default NewsItemTiny;
