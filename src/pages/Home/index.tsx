import './style.css'
import { Tabs } from 'antd-mobile'
import { useTabs } from './useTabs'
import HomeList from './HomeList'
const Home = () => {
    const { channels } = useTabs()

    return <div>
        <div className='tabContainer'>
            <Tabs defaultActiveKey={'0'}>
                {
                    channels.map(item => <Tabs.Tab title={item.name} key={item.id}>
                        <div className='listContainer'>
                            <HomeList channelId={'' + item.id}></HomeList>
                        </div>

                    </Tabs.Tab>)
                }

            </Tabs>
        </div>
    </div>
}

export default Home