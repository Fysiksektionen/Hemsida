export interface Group {
    id: number
    detail_url: string
    name: string
    description: string
    group_type: string  // Should be enum
    image: string | null
}

export interface GroupProxy {
    id: number
    group: Group
}

export interface User {
    id: number
    detail_url: string
    user_type: string
    last_login: string | null
    username: string
    first_name: string | null
    last_name: string | null
    email: string
    date_joined: string
    is_active: boolean
    kth_id: string | null
    year: string | null
    image: string | null
    language: string
    groups: GroupProxy[]
}