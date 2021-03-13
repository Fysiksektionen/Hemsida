import Frontpage from "./Frontpage";
import NewsArticlePage from "./NewsArticlePage";
import StyretPage from "./StyretPage";


const pageTypeMap: { [key: string]: any } = {
    start: Frontpage,
    news_article: NewsArticlePage,
    styret: StyretPage
}

export default pageTypeMap;

