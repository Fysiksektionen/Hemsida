/**
 * File defining types returned in API from server.
 *
 * This file should only contain types that help us parse the raw response of the server.
 * Do not add related types that are not returned by the server.
 */
import { SiteFooterCT, SiteHeaderCT } from './content_objects/content_trees/site';

type IDDetail = {
    id: number,
    detailUrl: string
}

export type Error = {
    code: string,
    message: string
}

export type MinimalPage = IDDetail & {
    name: string
}

export type Page = MinimalPage & {
    slug: string,
    pageType: string,
    parent: MinimalPage
    children: MinimalPage[],
    published: boolean,
    publishedAt: string,
    lastEditedAt: string,
    contentSv: ContentObject
    contentEn: ContentObject
}

export type Site = {
    rootUrl: string,
    rootPage: MinimalPage,
    headerContentSv: SiteHeaderCT,
    headerContentEn: SiteHeaderCT,
    footerContentSv: SiteFooterCT,
    footerContentEn: SiteFooterCT
}

export type MenuItem = {
    id: string,
    name: string,
    link: string,
    url?: string,
    page?: MinimalPage,
    isMenu: boolean
}

export type Menu = MenuItem & {
    items: (Menu | MenuItem)[]
}

export type Redirect = IDDetail & {
    fromPath: string,
    link: string,
    url: string,
    page: MinimalPage
}

export type Image = IDDetail & {
    href: string
} // More to be defined later

// TODO: Flytta till content_objects mappen
type ContentObjectDBType = 'text' | 'image' | 'menu' | 'page' | 'dict' | 'list'

type ContentObjectBase = {
    id: number,
    dbType: ContentObjectDBType,
}

export type ContentObject = ContentText | ContentImage | ContentMenu | ContentPage | ContentDict | ContentList

export type ContentText = ContentObjectBase & {
    dbType: 'text',
    text: string,
    attributes: object
}

export type ContentImage = ContentObjectBase & {
    dbType: 'image',
    image: Image,
    attributes: object
}

export type ContentMenu = ContentObjectBase & {
    dbType: 'menu',
    menu: Menu,
    attributes: object
}

export type ContentPage = ContentObjectBase & {
    dbType: 'page',
    page: MinimalPage,
    attributes: object
}

export type newContentDict<T extends NodeJS.Dict<ContentObject>, A = {}> = ContentObjectBase & {
    dbType: 'dict',
    items: T,
    attributes: A
}

export type ContentDict = ContentObjectBase & {
    dbType: 'dict',
    items: NodeJS.Dict<ContentObject>,
    attributes: {}
}

export type newContentList<T extends ContentObject, A = {}> = ContentObjectBase & {
    dbType: 'list',
    items: T[],
    attributes: A
}

export type ContentList = ContentObjectBase & {
    dbType: 'list',
    items: ContentObject[],
    attributes: {}
}

export type User = IDDetail & {
    userType: '' | 'student' | 'senior' | 'external' | 'admin',
    lastLogin: string,
    username: string,
    firstName: string,
    lastName: string,
    dateJoined: string,
    isActive: boolean,
    kthId: string,
    year: string,
    image: Image
    language: 'sv' | 'en',
    groups: Group[]
}

export type Group = IDDetail & {
    groupType: '' | 'chapter_group' | 'external' | 'admin',
    name: string,
    description: string,
    image: Image
}
