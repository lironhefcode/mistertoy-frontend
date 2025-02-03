import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { Home } from './pages/Home.jsx'
import { ToyesIndex } from './pages/Toyesindex.jsx'
import { Header } from './cmps/header.jsx'
import './assets/style/main.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
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
            </Routes>
          </div>
        </section>
      </Router>
      </Provider>
    </>
  )
}

export default App
