import React from 'react'

export default function Channels() {
    return (
        <div>
            <div className="channels-wrapper">
                <h1 className="text-xl text-gray-300 mb-5 p-3">Channels</h1>
                <div className="channel-items">
                    <div className="welcome mb-8">
                        <h2 className="channel-header">Welcome</h2>
                        <div>
                            <h3 className="channel-subheader">#announcements</h3>
                        </div>
                        <div>
                            <h3 className="channel-subheader">#faq</h3>
                        </div>
                        <div>
                            <h3 className="channel-subheader">#roadmap</h3>
                        </div>
                    </div>
                    <div className="clubhouse">
                        <h2 className="channel-header">Clubhouse</h2>
                        <div>
                            <h3 className="channel-subheader">#general</h3>
                        </div>
                        <div>
                            <h3 className="channel-subheader">#marketplace</h3>
                        </div>
                        <div>
                            <h3 className="channel-subheader">#show your picture</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
