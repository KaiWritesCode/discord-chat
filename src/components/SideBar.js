import React from 'react'
import { BsPlus } from 'react-icons/bs'


export const SideBar = () => {
    return (
        <div className="w-16 sidebar-wrapper">
            <div className="top-0 left-0 h-screen w-16 m-0 flex flex-col overflow-hidden bg-gray-900  text-white shadow-lg">
                <img src="/almost-discord/imgs/sodapfp.png" className="sidebar-icon group" alt="" />
                <img src="/almost-discord/imgs/hapepfp.png" className="sidebar-icon group" alt="" />
                <img src="/almost-discord/imgs/baycpfp.png" className="sidebar-icon group" alt="" />
                <img src="/almost-discord/imgs/creaturepfp.png" className="sidebar-icon group" alt="" />
                <BsPlus className="sidebar-icon" />
            </div>
        </div>
    )
}
