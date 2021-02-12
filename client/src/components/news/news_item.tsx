import React from 'react';

export interface INewsItem {
  image: string,
  title: string,
  published: Date,
  text: string
}

function NewsArticle(props : INewsItem) {
  return (
    <div className="" style={{width: "600px", marginBottom: "2em", backgroundColor: "#f0f0f0", marginRight: "1em"}}>
      <div style={{width: "100%"}}>
        <img src={props.image} style={{width: "100%"}} />
      </div>
      <div style={{padding: "1em"}}>
        <h4>{props.title}</h4>
        <small>{props.published.toLocaleDateString()}</small>
        <div>
          {props.text}
        </div>
      </div>
    </div>
  )
}

export default NewsArticle;
