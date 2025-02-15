import { request } from "@/utils"
import type { ResType } from "./shared"


export type ChannelItem = {
    id: number
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}

export function fetchChannelAPI() {
    return request.request<ResType<ChannelRes>>({
        url: '/channels'
    })
}

type ListParams = {
    channel_id: string,
    timestamp: string
}

type ListItem = {
    art_id: string
    title: string
    aut_id: string
    comm_count: number
    pubdate: string
    aut_name: string
    is_top: string
    cover: {
        type: number
        images: string[]
    }
}

export type ListRes = {
    results: ListItem[]
    pre_timestamp: string
}

export function fetchListAPI(params: ListParams) {
    return request.request<ResType<ListRes>>({
        url: '/articles',
        params
    })
}