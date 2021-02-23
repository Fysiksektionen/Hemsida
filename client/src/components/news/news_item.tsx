import React from 'react';


export interface INewsItem {
  image: string,
  title: string,
  published: Date,
  text: string
}


function NewsArticle(props : INewsItem) {
  return (
    <NewsArticleBase {...props}>
      <NewsArticleText text={props.text} />
    </NewsArticleBase> 
  )
}

export function NewsArticleBase(props : INewsItem & {children?: React.ReactNode}) {
  return (
    <div className="news-article-base" style={{backgroundColor: "#f0f0f0"}}>
      <div style={{width: "100%"}}>
        <img src={props.image} style={{width: "100%"}} alt='' />
      </div>
      <div className="p-4 news-article-base-text">
        <h4 className="mb-0">{props.title}</h4>
        <small>{props.published.toLocaleDateString()}</small>
        {props.children}
      </div>
    </div>
  )
}

export function NewsArticleText(props : {text: string}) {
  return (
    <div className="mt-3">
      {props.text}
    </div>
  )
}

export default NewsArticle;
