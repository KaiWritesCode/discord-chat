import React from 'react'
import { FaChevronCircleRight } from 'react-icons/fa'


export default function ChatInput({ sendMessage, setNewMessage, newMessage }) {
    return (
        <div className="w-full flex overflow-y-auto absolute bottom-0 px-6 bg-[#37393E]">
            <form className='w-full flex' action="">
                <input
                    disabled={localStorage.isAuth ? false : true}
                    type="text"
                    id='chat-input'
                    className={`custom-input bg-[#3a3f45] rounded-md h-10 focus:outline-none p-4 text-gray-100 ${!localStorage.isAuth ? 'disabledBtn' : null}`}
                    placeholder={localStorage.isAuth ? "Start chatting..." : "Login to start chatting.."}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button
                    id='chev-icon' className="mx-3
        hover:text-gray-200 transition-all duration-50 ease-out"
                    onClick={sendMessage}
                >
                    <FaChevronCircleRight color="white" size="34" /></button>
            </form>
        </div>
    )
}
