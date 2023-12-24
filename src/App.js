import React from 'react'
import About from './Components/About'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import Contact from './Components/Contact'
import Services from './Components/Services'
import States from './Components/States'
import NoPage from './Components/NoPage'

export default function App() {
  return (<>
    {/* <h1> It is the home page</h1> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} >
          <Route index element={<States />} />
          <Route path='states' element={<States />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='services' element={<Services />} />

          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>)

}
function MainMenu() {
  return (
    <div>
      <br />
      <Link to='/'>
        <button>HOME</button>
      </Link>
      <Link to='/about'>
        <button>About</button>
      </Link>
      <Link to='/contact'>
        <button>Contact</button>
      </Link>
      <Link to='/services'>
        <button>Services</button>
      </Link>
      <Link to='/states'>
        <button>States</button>
      </Link>
      <Outlet />

    </div>
  )

}
