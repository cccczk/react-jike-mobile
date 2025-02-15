import { DetailDataType, fetchDetailAPI } from "@/apis/detail"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { NavBar } from "antd-mobile"
const Detail = () => {
    const [params] = useSearchParams()
    const id = params.get('id')
    const [detail, setDetail] = useState<DetailDataType | null>(null)

    useEffect(() => {
        const getDetail = async () => {
            try {
                const res = await fetchDetailAPI(id!)
                setDetail(res.data.data)
            } catch (error) {
                throw new Error('getDetail error')
            }

        }
        getDetail()
    }, [id])
const navigate = useNavigate()
    const back = () => {
    navigate(-1)
}
    if (!detail) {
        return <div>this is loading</div>
    }
    return <div>
        <NavBar onBack={back}>
            {detail?.title}
        </NavBar>
        <div dangerouslySetInnerHTML={{ __html: detail?.content }}></div>
    </div>
}

export default Detail