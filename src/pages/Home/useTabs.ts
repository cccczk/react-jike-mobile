import { ChannelItem, fetchChannelAPI } from '@/apis/list.ts'

import { useEffect, useState } from 'react'


function useTabs() {
    const [channels, setChannels] = useState<ChannelItem[]>([])
    useEffect(() => {
        const getChannels = () => {
            try {
                fetchChannelAPI().then((res) => {
                    console.log(res.data);
                    setChannels(res.data.data.channels)
                })
            } catch (error) {
                throw new Error('fetch channel error')
            }
        }
        getChannels()
    }, [])
    return {channels}
}

export {useTabs}