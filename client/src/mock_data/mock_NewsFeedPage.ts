/**
 * Mock data for pages/NewsFeedPage.tsx
 */

import newsPlaceholder from '../placeholder_images/news_placeholder.jpg';
import newsPlaceholderImage1 from '../placeholder_images/news_placeholder1.jpg';
import newsPlaceholderImage2 from '../placeholder_images/news_placeholder2.jpg';
import newsPlaceholderImage3 from '../placeholder_images/news_placeholder3.jpg';
import { NewsPageMinimal } from '../types/news';

export const dummyArticles: NewsPageMinimal[] = [
    {
        id: 1,
        name: '',
        detailUrl: '',
        image: { id: 1, detailUrl: '', href: newsPlaceholder },
        title: 'Dummy news 1',
        preamble: 'Some news text here',
        publishedAt: '2020-12-24'
    },
    {
        id: 2,
        name: '',
        detailUrl: '',
        image: { id: 1, detailUrl: '', href: newsPlaceholderImage1 },
        title: 'Dummy news 1',
        preamble: 'Some news text here',
        publishedAt: '2020-12-24'
    },
    {
        id: 3,
        name: '',
        detailUrl: '',
        image: { id: 1, detailUrl: '', href: newsPlaceholderImage2 },
        title: 'Dummy news 1',
        preamble: 'Some news text here',
        publishedAt: '2020-12-24'
    },
    {
        id: 4,
        name: '',
        detailUrl: '',
        image: { id: 1, detailUrl: '', href: newsPlaceholderImage3 },
        title: 'Dummy news 1',
        preamble: 'Some news text here',
        publishedAt: '2020-12-24'
    }
];
