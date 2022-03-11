import React, { useState, useEffect, useRef } from 'react'
import { FaChevronCircleRight } from 'react-icons/fa'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'
import { collection, addDoc, orderBy, onSnapshot, deleteDoc, query, serverTimestamp, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'





export default function Chat({ setIsAuth, isAuth }) {
    const [userCollection, setUserCollection] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [popup, setPopup] = useState(false)

    const usersCollectionRef = collection(db, "users")
    const messagesEndRef = useRef(null)
    const retrievedPfp = localStorage.getItem('pfp')
    const retrievedName = localStorage.getItem('name')

    const q = query(usersCollectionRef, orderBy('createdAt'))

    useEffect(() => {
        const getUserCollection = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setUserCollection(data)
        })
        return () => getUserCollection()
    }, [])

    const logout = async () => {
        setIsAuth(false)
        localStorage.clear()
        await signOut(auth)
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const provider = auth.currentUser.providerData[0]
        if (provider === undefined || provider === null) {
            await addDoc(usersCollectionRef, {
                message: newMessage,
                createdAt: serverTimestamp(),
                user: { name: 'Guest', id: auth.currentUser.uid, picture: "/discord-chat/imgs/guest.png" }
            })
        }
        else if (provider.providerId === 'password') {
            await addDoc(usersCollectionRef, {
                message: newMessage,
                createdAt: serverTimestamp(),
                user: { name: retrievedName, id: auth.currentUser.uid, picture: retrievedPfp }
            })
        } else {
            await addDoc(usersCollectionRef, {
                message: newMessage,
                createdAt: serverTimestamp(),
                user: { name: auth.currentUser.displayName, id: auth.currentUser.uid, picture: auth.currentUser.photoURL }
            })
        }


        setNewMessage('')
    }



    const deleteMessage = async (id) => {
        const messageDoc = doc(db, "users", id);
        await deleteDoc(messageDoc)
    }

    const popupModal = () => {
        setPopup(true)
    }
    const closePopup = () => {
        if (popup) {
            setPopup(false)
        }
    }
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [newMessage])

    const chatBox =
        userCollection.map((item) => {
            const timeSeconds = item.createdAt
            const created = new Date(timeSeconds * 1000)
            const localDate = created.toLocaleString()
            let standardTime = localDate.substring(localDate.indexOf(",") + 1)


            return (
                <div key={item.id} className="chatbox bg-[#37393E] text-gray-100 p-4">
                    <div className="profile flex items-center"><img src={item.user.picture} className="w-12 rounded-full" alt="" />
                        {item.user.name && <span className="ml-1">{item.user.name}
                            <span style={{ display: item.user.name === 'Guest' ? 'inline' : 'none' }}> - {item.id.slice(0, 2)}</span>
                        </span>}
                        <span className="text-gray-500 ml-2">{standardTime}</span>
                        {/* {
                            localStorage.isAuth && item.user.id === auth.currentUser.uid &&
                            <button onClick={popupModal} className='hidden text-xl text-gray-100 ml-2 colon-btn'> ⫶</button>
                        }
                        <div className={`popup-div ${popup ? 'inline' : 'hidden'}`}>
                            {localStorage.isAuth && item.user.id === auth.currentUser.uid &&
                                <button className='colon-item-btn text-red-600 ' onClick={() => deleteMessage(item.id)}>Delete</button>
                            }
                        </div> */}

                    </div>
                    <div className="text px-12">
                        {item.message}
                    </div>

                </div>
            )
        })




    return (
        <div className="relative w-full" onClick={closePopup}>
            <div className="flex flex-col">
                <header className="bg-[#52545d] header text-gray-100 p-5 px-12 text-lg w-full h-11 flex items-center">
                    <div>
                        <span>#</span>
                        <span>Main-Chat</span>
                    </div>


                    <div className="flex justify-around ml-auto">
                        <Link to='/login'>
                            {localStorage.isAuth ? <span onClick={logout}>Log out</span> : <span>Log In</span>}
                        </Link>

                    </div>
                </header>


                <div className="h-[85vh] overflow-y-auto block">

                    <div className="chatbox bg-[#37393E] text-gray-100 p-4">
                        <div className="profile flex items-center"><img src="/discord-chat/imgs/bayc2.jpeg" className="w-12 rounded-full" alt="" />
                            <span className="ml-1 text-yellow-300">Dyno</span>
                            <span className="text-gray-500 ml-2">Today at 9:48 AM</span>
                        </div>
                        <div className="text px-12">
                            Hello people seeing this project, I am the mod Dyno for this "Discord Server".
                            Please login or create an account to start chatting.
                        </div>
                    </div>


                    {chatBox}
                    <div ref={messagesEndRef} ></div>
                </div>



                <div className="w-full flex overflow-y-auto absolute bottom-0 px-6 bg-[#37393E]">
                    <form className='w-full flex' action="">
                        <input
                            disabled={localStorage.isAuth ? false : true}
                            type="text"
                            id='chat-input'
                            className={`custom-input bg-[#3a3f45] rounded-md h-10 focus:outline-none p-4 text-gray-100 ${!localStorage.isAuth ? 'disabledBtn' : null}`}
                            placeholder="start chatting.."
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
            </div>
            <div className='h-[64px]'></div>
        </div >
    )
}
