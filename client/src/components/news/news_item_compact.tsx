import React from 'react';
import NewsArticle, {INewsItem} from './news_item'

function NewsItemCompact(props : INewsItem) {
  return (
    <NewsArticle {...props}/>
  )
}

export default NewsItemCompact;
