import React from 'react';
import NewsArticle, {INewsItem} from '../components/news/news_item';
import MenuMonths from '../components/menu_months'

function NewsArticlePage(props: INewsItem) {
    return (
      <div>
        <h1>Nyheter</h1>
        <div  style={{display: "flex"}}>
          <NewsArticle {...props}/>
          <MenuMonths />
        </div>
      </div>
    )
  }
  
  export default NewsArticlePage;