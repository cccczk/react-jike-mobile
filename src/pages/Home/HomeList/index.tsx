import { Image, InfiniteScroll, List } from 'antd-mobile'
// mock数据
// import { users } from './users'
import { useEffect, useState } from 'react'
import { fetchListAPI, ListRes } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
    channelId: string
}
const HomeList = (props: Props) => {
    const { channelId } = props
    const [hasMore, setHasMore] = useState(true)
    const loadMore = async () => {
        console.log('shangla');
        try {
            const res = await fetchListAPI({
                channel_id: channelId,
                timestamp: listRes.pre_timestamp
            })
            setListRes({
                results: [...listRes.results,...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })
            if (res.data.data.results.length === 0) {
                setHasMore(false)
            }
        } catch (error) {
            throw new Error('fetch list error')
        }
    }
    const [listRes,setListRes] = useState<ListRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime()
    })
    useEffect(() => {
        const getList = async() => {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: '' + new Date().getTime()
                })
                setListRes({
                    results: res.data.data.results,
                    pre_timestamp: res.data.data.pre_timestamp
                })
            } catch (error) {
                throw new Error('fetch list error')
            }
        }
        getList()
    }, [channelId])
    const navigate = useNavigate()
    const goToDetail = (id: string) => {
        navigate(`/detail?id=${id}`)
    }
    return (
        <>
            <List>
                {listRes.results.map((item) => (
                    <List.Item
                        onClick={()=>goToDetail(item.art_id)}
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit="cover"
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10}/>
        </>
    )
}

export default HomeList