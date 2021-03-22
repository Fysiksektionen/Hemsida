import StyretPage from './StyretPage';
import NewsFeedPage from './NewsFeedPage';
import { PageComponent } from '../types/general';

/**
 * Dictionary mapping a page_type string to a page component.
 * NOTE: The map should be one to one. Multiple page_types per component is NOT recommended.
 * Instead make multiple page components or incorporate the different behaviours in ContentCollection of page.
 */
const pageTypeMap: { [key: string]: PageComponent } = {
    styret: StyretPage,
    news_feed: NewsFeedPage
};

export default pageTypeMap;
