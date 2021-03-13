import {FunctionComponent} from "react";
import {PageData} from "../components/PageTypeLoader";
import Frontpage from "./Frontpage";
import NewsArticlePage from "./NewsArticlePage";
import StyretPage from "./StyretPage";


const pageTypeMap: { [key: string]: FunctionComponent<PageData> } = {
    "start": Frontpage,
    "news_article": NewsArticlePage,
    "styret": StyretPage
}

export default pageTypeMap;

