import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Outlet, Route, Link, Routes } from 'react-router-dom'
import NOPage from './Components/NoPage'
import States from './Components/States'
//import About from './Components/About'
//import Contact from './Components/Contact'
//import Services from './Components/Services'
//import Card from './Components/Card'
//import NewsAPI from './Components/NewsAPI'
import { Button } from 'semantic-ui-react'
//import NewsAPIP from './Components/NewsAPINP'
//import NewsPra2 from './Components/NewsPra2'
// import Students from './FB/Students'
import OTPLogin from './FB/OTPLogin'
import { createContext } from 'react'
import Account from './FB/Account'
import MyToDoList from './FB/MyToDoList'
import TodoSimple from './FB/TodoSimple'
import Students from './express/Students'
export const MyContext = createContext(null)

export default function App() {
  const [user, setUser] = useState(55)
  const [token, setToken] = useState(null)
  return (<div>
    {/* <MyContext.Provider value={{ user, setUser }}/> */}
    <MyContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu />}>
            <Route path='*' element={<NOPage />} />
            <Route index element={<States />} />
            {/* <Route path='states' element={<States />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='services' element={<Services />} />
            <Route path='card' element={<Card />} />
            <Route path='/newsapi' element={<NewsAPI />} />
            <Route path='/newsapinp' element={<NewsAPIP />} />
            <Route path='/newspra2' element={<NewsPra2 />} /> */}
            <Route path='/students' element={<Students />} />
            <Route path='/otplogin' element={<OTPLogin user={user} />} />
            <Route path='/account' element={<Account />} />
            <Route path='/todosimple' element={<TodoSimple />} />
            <Route path='/mytodolist' element={<MyToDoList />} />
            <Route path='/students' element={<Students />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  </div>
  )
}
function MainMenu() {
  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    color: '#fff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: 'npx',
    cursor: 'pointer',
    width: '100px',
    height: '50px',
  }
  return (
    <div>
      <Link to='/'><button style={buttonStyle}>HOME</button></Link>
      <Link to='/states'><button style={buttonStyle}>States</button></Link>
      {/* <Link to='/about'><button style={buttonStyle}>About</button></Link>
      <Link to='/contact'><button style={buttonStyle}>Contact</button></Link>
      <Link to='/services'><button style={buttonStyle}>Services</button></Link>
      <Link to='/card'><button style={buttonStyle}>Card</button></Link>
      <Link to='/newsapi'><button style={buttonStyle}>NewsAPI</button></Link>
      <Link to='/newsapinp'><Button style={buttonStyle}>NewsAPIP</Button></Link>
      <Link to='/newspra2'><Button style={buttonStyle}>News API Pra2</Button></Link> */}
      <Link to='/students'><Button style={buttonStyle}>Students</Button></Link>
      <Link to='/otplogin'><Button style={buttonStyle}>OTPLogin</Button></Link>
      <Link to='/account'><Button style={buttonStyle}>Account</Button></Link>
      <Link to='/todosimple'><Button style={buttonStyle}>Todo Simple</Button></Link>
      <Link to='/mytodolist'><Button style={buttonStyle}>MyToDoList</Button></Link>
      <Link to='/students'><Button style={buttonStyle}>Students</Button></Link>
      <Outlet />
      <style>

      </style>
    </div>
  )
}