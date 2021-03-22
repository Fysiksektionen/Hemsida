import { FunctionComponent } from 'react';
import { PageData } from '../components/PageTypeLoader';
import NewsArticlePage from './NewsArticlePage';
import StyretPage from './StyretPage';

/**
 * Dictionary mapping a page_type string to a page component.
 * NOTE: The map should be one to one. Multiple page_types per component is NOT recommended.
 * Instead make multiple page components or incorporate the different behaviours in ContentCollection of page.
 */
const pageTypeMap: { [key: string]: FunctionComponent<PageData> } = {
    news_article: NewsArticlePage,
    styret: StyretPage
};

export default pageTypeMap;
