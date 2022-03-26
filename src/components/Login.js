import React, { useState, useEffect } from 'react'
import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    signInAnonymously,
    createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase'
import CarouselSlider from './ CarouselSlider'




export default function NewUser({ setIsAuth, isAuth }) {
    const history = useHistory()
    const [isCreated, setIsCreated] = useState(false)
    const [createdEmail, setCreatedEmail] = useState("")
    const [createdPassword, setCreatedPassword] = useState("")
    const [createdName, setCreatedName] = useState("")
    const [authenticated, setAuthenicated] = useState(false)




    const [profile, setProfile] = useState({
        name: '',
        image: ''
    })
    const [userCollection, setUserCollection] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const auth = getAuth()

    const usersCollectionRef = collection(db, "users")


    useEffect(() => {
        const getUserCollection = async () => {
            const data = await getDocs(usersCollectionRef);
            setUserCollection(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUserCollection()
    }, [])


    const signInGuest = () => {
        signInAnonymously(auth)
            .then((result) => {
                localStorage.setItem("isAuth", true)
                setAuthenicated(true)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            });
    }


    const provider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("isAuth", true)
            }).catch((error) => {
                setErrorMessage(`Error:${error.message}`)
            })
    }

    const createAccount = async (e) => {
        createUserWithEmailAndPassword(auth, createdEmail, createdPassword)
            .then((result) => {
                const user = result.user
                setIsCreated(true)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }


    const loginUser = (e) => {
        signInWithEmailAndPassword(auth, createdEmail, createdPassword)
            .then((result) => {
                const user = result.user
                const loginUserId = user.uid
                userCollection.map((item) => {
                    const uid = item.user.id
                    const { name, picture } = item.user
                    if (uid === loginUserId) {
                        setProfile((prevState) => {
                            const newProfile = { ...prevState, name: name, image: picture }
                            localStorage.setItem("profile", JSON.stringify(newProfile))

                        })

                        localStorage.setItem("isAuth", true)
                    }
                })
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }

    useEffect(() => {
        if (localStorage.isAuth || authenticated) {
            history.push("/")
        }
    }, [localStorage.isAuth])

    const finishAccount = (e) => {
        e.preventDefault()
        localStorage.setItem("name", createdName)
        localStorage.setItem("isAuth", true)
    }




    const login = (
        <div className='login-wrapper'>

            <div className="box">
                <h1 className="text-3xl text-center mt-2 my-3 mb-6">Login to Start Chatting!</h1>

                <form>
                    <input placeholder='Enter email..'
                        onChange={e => setCreatedEmail(e.target.value)} required className='custom-input'
                        type="email" name="email" value={createdEmail} />

                    <input placeholder='Password..'
                        onChange={e => setCreatedPassword(e.target.value)} required className='custom-input'
                        type="password" name="password" autoComplete='current-password' value={createdPassword} />

                    <div className='flex justify-center' >
                        <div onClick={loginUser} className="btn">Login</div>

                        <div onClick={createAccount} className="btn2">Create Account</div>
                    </div>
                    <div className='text-center text-red-600 '>{errorMessage}</div>

                </form>
                <div className="flex justify-between items-center mt-3">
                    <hr className="w-full" /> <span className="p-2 inline text-gray-400 mb-1">OR</span>
                    <hr className="w-full" />
                </div>
                <div className='flex flex-col m-2'>
                    <button className='login-with-google-btn border border-gray-300 rounded-md mt-4 text-gray-500 p-3 text-sm' onClick={signInWithGoogle}>Sign in with Google (unavaliable)</button>
                    <button className='guest-btn border border-gray-300 rounded-md mt-4 text-gray-500 p-3 text-sm ' onClick={signInGuest}>Continue as Guest</button>
                </div>

            </div>

        </div>
    )


    const nextSteps = (

        <div className='login-wrapper'>
            <div className="box">
                <h1 className='login-h1 text-4xl text-center mt-2 my-3 mb-6'>Finish your Profile</h1>
                <form onSubmit={finishAccount}>
                    <h3>Whats your name?</h3>
                    <input placeholder='First Name' onChange={e => setCreatedName(e.target.value)}
                        required className='custom-input' value={createdName} type="text" name="text" />
                    <div>
                        <h3>Choose a Profile Picture</h3>
                        <CarouselSlider />
                    </div>

                    <div className='flex justify-center' >
                        <button className="btn">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )




    return (
        <>
            {!isCreated ? login : nextSteps}
        </>
    )
};
