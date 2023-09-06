import React from 'react'
import Sidebar from './Sidebar'
export const Error = () => {
  return (
    <div className='w-screen  flex gap-0 overflow-y-hidden '>
        {/* <div className='w-full grid grid-cols-[5%_75%_20%]'> */}
            <div className='w-[10%] min-h-screen '>
                <Sidebar />
            </div>
            <div className='w-[75%] min-h-screen flex justify-center items-center text-cyan-700 text-2xl bg-white '>
                This Page is under Maintenance.Please Try Again Later.
            </div>
            <div className='w-[15%] min-h-screen '>
                <Sidebar />
            </div>
        </div>
  )
}
