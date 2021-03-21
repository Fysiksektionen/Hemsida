import { List, ListItem } from '@material-ui/core';
import React from 'react';
import NewsArticle, { INewsItem } from '../components/news/NewsArticle';
import { IMenuItem, SidebarMenu } from '../components/SidebarMenu';
import newsPlaceholder from '../placeholder_images/news_placeholder.jpg';
import newsPlaceholderImage1 from '../placeholder_images/news_placeholder1.jpg';
import newsPlaceholderImage2 from '../placeholder_images/news_placeholder2.jpg';
import newsPlaceholderImage3 from '../placeholder_images/news_placeholder3.jpg';

export const dummyArticles: INewsItem[] = [
    {
        id: 'dummy_1',
        image: newsPlaceholder,
        title: 'Dummy news 1',
        published: new Date('2021-01-21'),
        text: 'Some news text here'
    },
    {
        id: 'dummy_2',
        image: newsPlaceholderImage1,
        title: 'Dummy news 2',
        published: new Date('2020-12-24'),
        text: 'Some news text here'
    },
    {
        id: 'dummy_3',
        image: newsPlaceholderImage2,
        title: 'Dummy news 3',
        published: new Date('2020-12-23'),
        text: 'Some news text here'
    },
    {
        id: 'dummy_4',
        image: newsPlaceholderImage3,
        title: 'Dummy news 4',
        published: new Date('2020-11-20'),
        text: 'Some news text here'
    }
];

interface INewsFeedProps {
  newsArticles: INewsItem[];
}

const months: string[] = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December'
];

const getMonthYearString = (item: Date) => (
    months[item.getMonth()] + ' ' + item.getFullYear()
);

const NUM_RECENT_MONTHS = 10;

const getRecentMonths = (): Date[] => {
    const now = new Date();
    const recentMonths: Date[] = [];
    const mostRecent = { month: now.getMonth(), year: now.getFullYear() };
    let i: number;
    for (i = 0; i < NUM_RECENT_MONTHS; ++i) {
        recentMonths.push(new Date(mostRecent.year, mostRecent.month));
        mostRecent.month -= 1;
        if (mostRecent.month === -1) {
            mostRecent.month = 11;
            mostRecent.year -= 1;
        }
    }

    return recentMonths;
};

export const HEADER_HEIGHT = '150px';

export default function NewsFeedPage({ newsArticles }: INewsFeedProps) {
    // assumes newsArticles is sorted by date
    const recentMonths = getRecentMonths();
    const menuItems: IMenuItem[] = [];
    recentMonths.forEach((monthYear) => {
        menuItems.push({
            id: getMonthYearString(monthYear),
            title: getMonthYearString(monthYear)
        });
    });

    let usedMonth = (recentMonths[0].getMonth() + 1) % 12;

    newsArticles.forEach(article => {
        if (article.published.getMonth() < usedMonth || (article.published.getMonth() === 11 && usedMonth === 0)) {
            usedMonth = article.published.getMonth();
            menuItems.forEach(item => {
                if (item.title === getMonthYearString(article.published)) {
                    item.refsTo = article.id;
                }
            });
        }
    });

    menuItems.unshift({
        id: 'mostRecentNews',
        title: 'Senaste nytt',
        refsTo: 'news-header'
    });

    // const itemRefs = feedItems.reduce((acc: { [id: string]: any }, item) => {
    //   if (item.linkedBy) acc[item.content.id] = React.createRef();
    //     return acc;
    // }, {});

    return (
        <SidebarMenu menuItems={menuItems}>
            <h1
                id="news-header"
                className="py-2 mt-2"
                style={{ scrollMarginTop: HEADER_HEIGHT }}
            >
        Nyheter
            </h1>
            <List>
                {newsArticles.map(article =>
                    <ListItem
                        id={article.id}
                        key={article.id}
                        className="py-2"
                        style={{ scrollMarginTop: HEADER_HEIGHT }} // 150px == height of page header
                    >
                        <NewsArticle {...article}/>
                    </ListItem>
                )}
            </List>
        </SidebarMenu>
    );
}
