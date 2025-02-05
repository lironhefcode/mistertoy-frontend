import { useState } from 'react'

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { Home } from './pages/Home.jsx'
import { ToyesIndex } from './pages/Toyesindex.jsx'
import { Header } from './cmps/Header.jsx'
import './assets/style/main.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Dashborad } from './pages/Dashboard.jsx'
function App() {


  return (
    <>
    <Provider store={store}>
      <Router>
        <section className='app'>
          <Header />
          <div className='main-layout'>
            <Routes>
              <Route element={<Home />} path='/'></Route>
              <Route path='/toys' element={<ToyesIndex />}></Route>
              <Route path='/toys/:toyId' element={<ToyDetails/>}></Route>
              <Route path='/toys/edit/:toyId?' element={<ToyEdit/>}></Route>
              <Route path='/toys/edit' element={<ToyEdit/>}></Route>
              <Route path='/dashboard' element={<Dashborad/>}></Route>
            </Routes>
          </div>
        </section>
      </Router>
      <UserMsg/>
      </Provider>
    </>
  )
}

export default App
