import React from 'react'
import Sidebar from '../components/Sidebar'
import ConversationContainer from '../components/ConversationContainer'
export const Dashboard = () => {
    return (
        <div className='w-screen  flex gap-0 overflow-y-hidden '>
            <div className='w-[10%] min-h-screen '>
                <Sidebar />
            </div>
            <div className='w-[90%] min-h-screen '>
                <ConversationContainer />
            </div>
        </div>
    )
}
