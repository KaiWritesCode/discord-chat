import React, { useState } from 'react'
import Chat from './components/Chat'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from "./components/NotFound"
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'


function App() {
  // let [isAuth, setIsAuth] = useState(false)


  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/chat" >
            <div className="flex home">
              <Chat setIsAuth={setIsAuth} isAuth={isAuth} />
            </div>
          </Route> */}

          <ProtectedRoute path="/" exact component={Chat} />

          <Route path="/login">
            <Login />
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