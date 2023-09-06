import React from 'react'
import Sidebar from '../components/Sidebar'
import ConversationContainer from '../components/ConversationContainer'
import { InfoContainer } from '../components/InfoContainer'
export const Dashboard = () => {
    return (
        <div className='w-screen  flex gap-0 overflow-y-hidden '>
        {/* <div className='w-full grid grid-cols-[5%_75%_20%]'> */}
            <div className='w-[10%] min-h-screen '>
                <Sidebar />
            </div>
            <div className='w-[75%] min-h-screen '>
                <ConversationContainer />
            </div>
            <div className='w-[15%] min-h-screen '>
                <InfoContainer />
            </div>
        </div>
    )
}
