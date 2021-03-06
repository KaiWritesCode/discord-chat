import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='grid place-items-center w-full h-[100vh]'>
            <div className="flex justify-center align-middle flex-col m-auto ">
                <div className="text-[5em] text-[white] text-center">
                    404
                </div>
                <div className="text-[2.6em] text-white text-center">
                    <span className="oops block">
                        Oooops...
                    </span>
                    <span className="not-found text-center">
                        Page not found
                    </span>
                </div>
                <Link to='/'>
                    <button className="text-center bg-blue-500  p-3 px-0 text-white rounded-sm 
                    font-bold hover:bg-blue-700 ease-in-out duration-300 cursor-pointer my-3 px-3 w-full">
                        Back to Homepage
                    </button>
                </Link>
            </div>
        </div>
    )
}