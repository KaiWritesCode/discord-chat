import React, { useState } from 'react'
import Chat from './components/Chat'
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
          <Route path="/chat" >
            <div className="flex home">
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