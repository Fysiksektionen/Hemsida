/**
 * File defining types returned in API from server.
 *
 * This file should only contain types that help us parse the raw response of the server.
 * Do not add related types that are not returned by the server.
 */

export type APIResponse<T> = {
    code: number, // Status code
    data: T // Data of the response
}

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
    contentSv: object
    contentEn: object
}

export type SiteSettings = {
    rootUrl: string,
    rootPage: MinimalPage
}

export type SiteContents = {
    bannerContentSv: object,
    bannerContentEn: object,
    footerContentSv: object,
    footerContentEn: object
}

export type Site = SiteSettings & SiteContents

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

export type Image = IDDetail & {} // More to be defined later

type ContentObjectDBType = 'text' | 'image' | 'menu' | 'page' | 'dict' | 'list'

type ContentObjectBase = IDDetail & {
    name: string,
    dbType: ContentObjectDBType,
    attributes: object
}

export type ContentObject = ContentText | ContentImage | ContentMenu | ContentPage | ContentDict | ContentList

export type ContentText = ContentObjectBase & {
    dbType: 'text',
    text: string
}

export type ContentImage = ContentObjectBase & {
    dbType: 'image',
    image: Image
}

export type ContentMenu = ContentObjectBase & {
    dbType: 'menu',
    menu: Menu
}

export type ContentPage = ContentObjectBase & {
    dbType: 'page',
    page: MinimalPage
}

export type ContentDict = ContentObjectBase & {
    dbType: 'dict',
    items: NodeJS.Dict<ContentObject>
}

export type ContentList = ContentObjectBase & {
    dbType: 'list',
    items: ContentObject[]
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
