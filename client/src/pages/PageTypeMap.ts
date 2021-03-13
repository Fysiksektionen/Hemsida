import Frontpage from "./Frontpage";
import NewsArticlePage from "./NewsArticlePage";
import StyretPage from "./StyretPage";
import {PageData} from "../components/PageTypeLoader";
import {FunctionComponent} from "react";


const pageTypeMap: { [key: string]: FunctionComponent<PageData> } = {
    "start": Frontpage,
    "news_article": NewsArticlePage,
    "styret": StyretPage
}

export default pageTypeMap;

