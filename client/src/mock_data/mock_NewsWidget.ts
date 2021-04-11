/**
 * Mock data for components/news/FrontpageNewsWidget.tsx
 */

import newsPlaceholderImage1 from '../mediafiles/placeholder_images/news_placeholder1.jpg';
import newsPlaceholderImage2 from '../mediafiles/placeholder_images/news_placeholder2.jpg';
import newsPlaceholderImage3 from '../mediafiles/placeholder_images/news_placeholder3.jpg';
import newsPlaceholder from '../mediafiles/placeholder_images/news_placeholder.jpg';
import { NewsPageMinimal } from '../types/news';

export const DummyData : NewsPageMinimal[] = [
    {
        id: 1,
        detailUrl: '',
        name: '',
        image: { id: 1, detailUrl: '', href: newsPlaceholderImage1 },
        title: 'Nyhet om fem unga fysiker som sitter och sjunger',
        preamble: 'Some news text here',
        publishedAt: '2021-01-01'
    },
    {
        id: 2,
        detailUrl: '',
        name: '',
        image: { id: 2, detailUrl: '', href: newsPlaceholderImage2 },
        title: 'Nyhet om fem unga fysiker som sitter och sjunger',
        preamble: 'Some news text here',
        publishedAt: '2021-01-02'
    },
    {
        id: 3,
        detailUrl: '',
        name: '',
        image: { id: 3, detailUrl: '', href: newsPlaceholderImage3 },
        title: 'En nyhet som ingen kommer att läsa',
        preamble: 'Some news text here',
        publishedAt: '2021-01-03'
    }
];

export const DummyData2 : NewsPageMinimal = {
    id: 1,
    name: '',
    detailUrl: '',
    image: { id: 1, detailUrl: '', href: newsPlaceholder },
    title: 'Det blir en mottagning',
    preamble: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    publishedAt: '2021-01-04'
};
