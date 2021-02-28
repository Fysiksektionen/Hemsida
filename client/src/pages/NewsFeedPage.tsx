import { List, ListItem } from "@material-ui/core";
import React from  "react";
import NewsArticle, { INewsItem } from "../components/news/NewsArticle";
import { SidebarMenu } from "../components/SidebarMenu";
import news_placeholder from '../placeholder_images/news_placeholder.jpg';
import news_placeholder_image1 from '../placeholder_images/news_placeholder1.jpg';
import news_placeholder_image2 from '../placeholder_images/news_placeholder2.jpg';
import news_placeholder_image3 from '../placeholder_images/news_placeholder3.jpg';

export const dummyArticles: INewsItem[] = [
  {
    id: "dummy_1",
    image: news_placeholder,
    title: "Dummy news 1",
    published: new Date("2021-01-21"),
    text: "Some news text here"
  },
  {
    id: "dummy_2",
    image: news_placeholder_image1,
    title: "Dummy news 2",
    published: new Date("2020-12-24"),
    text: "Some news text here"
  },
  {
    id: "dummy_3",
    image: news_placeholder_image2,
    title: "Dummy news 3",
    published: new Date("2020-12-23"),
    text: "Some news text here"
  },
  {
    id: "dummy_4",
    image: news_placeholder_image3,
    title: "Dummy news 4",
    published: new Date("2020-11-20"),
    text: "Some news text here"
  }
]

interface INewsFeedProps {
  newsArticles: INewsItem[];
}

export interface IMonthYear {
  month: number;
  year: number;
}

export interface IFeedItem {
  content: INewsItem;
  linkedBy?: IMonthYear;
  ref?: any;
}

export default function NewsFeedPage({ newsArticles }: INewsFeedProps) {
  // assumes newsArticles is sorted by date
  let menuItems: IMonthYear[] = []
  let mostRecent = { month: newsArticles[0].published.getMonth(), year: newsArticles[0].published.getFullYear() };
  let i: number;
  for ( i = 0; i < 12; ++i ) {
    menuItems.push({...mostRecent});
    mostRecent.month -= 1;
    if (mostRecent.month === -1) {
      mostRecent.month = 11;
      mostRecent.year -= 1;
    }
  }

  let usedMonth = (mostRecent.month + 1) % 12;
  let thisMonth: number;
  let linking: IMonthYear | undefined;
  let feedItems: IFeedItem[] = [];
  newsArticles.forEach(article => {
    thisMonth = article.published.getMonth();
    if (thisMonth < usedMonth || (thisMonth === 11 && usedMonth === 0)) {
      linking = { month: thisMonth, year: article.published.getFullYear() };
      usedMonth = thisMonth;
    } else {
      linking = undefined;
    }
    feedItems.push(
      {
        content: article,
        linkedBy: linking,
      }
    );
  })

  const itemRefs = feedItems.reduce((acc: { [id: string]: any }, item) => {
    if (item.linkedBy) acc[item.content.id] = React.createRef();
      return acc;
  }, {});

  console.log("itemRefs", itemRefs);

  return (
    <SidebarMenu feedItems={feedItems} menuItems={menuItems}>
      <h1 className="py-2 mt-2">
        Nyheter
      </h1>
      <List>
        {newsArticles.map(article  =>
          <ListItem
            id={article.id}
            key={article.id}
            className="py-2"
            style={{scrollMarginTop: "150px"}} // 150px == height of page header
          >
            <NewsArticle {...article}/>
          </ListItem>
        )}
      </List>
    </SidebarMenu>
  )
}
