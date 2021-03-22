/**
 * Mock data for pages/NewsFeedPage.tsx
 */

import { INewsItem } from '../components/news/NewsArticle';
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
