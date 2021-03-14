

export type APIResponse<T> = {
    code: number,  // Status code
    data: T        // Data of the response
}

type IDDetail = {
    id: number,
    detail_url: string
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
    page_type: string,
    parent: MinimalPage
    children: MinimalPage[],
    published: boolean,
    published_at: string,
    last_edited_at: string,
    content_sv: object
    content_en: object
}

export type Site = {
    root_url: string,
    root_page: Page,
    banner_content_sv: object,
    banner_content_en: object,
    footer_content_sv: object,
    footer_content_en: object
}

export type MenuItem = {
    id: string,
    name: string,
    link: string,
    url?: string,
    page?: MinimalPage,
    is_menu: boolean
}

export type Menu = MenuItem & {
    items: (Menu | MenuItem)[]
}

export type Redirect = IDDetail & {
    from_path: string,
    link: string,
    url: string,
    page: MinimalPage
}

export type Image = IDDetail & {}  // More to be defined later


type ContentObjectDBType = "text" | "image" | "menu" | "page" | "dict" | "list"

type ContentObjectBase = IDDetail & {
    name: string,
    db_type: ContentObjectDBType,
    attributes: object
}

export type ContentObject = ContentText | ContentImage | ContentMenu | ContentPage | ContentDict | ContentList

export type ContentText = ContentObjectBase & {
    db_type: "text",
    text: string
}

export type ContentImage = ContentObjectBase & {
    db_type: "image",
    image: Image
}

export type ContentMenu = ContentObjectBase & {
    db_type: "menu",
    menu: Menu
}

export type ContentPage = ContentObjectBase & {
    db_type: "page",
    page: MinimalPage
}

export type ContentDict = ContentObjectBase & {
    db_type: "dict",
    items: NodeJS.Dict<ContentObject>
}

export type ContentList = ContentObjectBase & {
    db_type: "list",
    items: ContentObject[]
}


export type User = IDDetail & {
    "user_type": string,  //TODO: Replace with enum type
    "last_login": string,
    "username": string,
    "first_name": string,
    "last_name": string,
    "date_joined": string,
    "is_active": boolean,
    "kth_id": string,
    "year": string,
    "image": Image
    "language": "sv" | "en",
    "groups": Group[]
}

export type Group = IDDetail & {
    "group_type": string,  //TODO: Replace with enum type
    "name": string,
    "description": string,
    "image": Image
}