import React, { useState } from 'react'
import Channels from './components/Channels'
import Chat from './components/Chat'
import { SideBar } from './components/SideBar'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from "./components/NotFound"

import './App.css'
import Login from './components/Login'

function App() {
  let [isAuth, setIsAuth] = useState(false)


  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="flex home">
              <SideBar />
              <Channels />
              <Chat setIsAuth={setIsAuth} isAuth={isAuth} />
            </div>
          </Route>

          <Route path="/login">
            <Login setIsAuth={setIsAuth} isAuth={isAuth} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App