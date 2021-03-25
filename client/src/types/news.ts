/**
 * Types that are used with news-related stuff by multiple files throughout the project.
 */
import { Page, Image, MinimalPage } from './api_object_types';

export type NewsPage = Page & {
    title: string
    image: Image
    preamble: string
}

export type NewsPageMinimal = MinimalPage & {
    publishedAt: string
    title: string
    image: Image
    preamble: string
}
