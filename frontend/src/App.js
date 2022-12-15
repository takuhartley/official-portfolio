import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Logout from './Components/Header/Logout/Logout.jsx'
import Projects from './Pages/Projects/Projects.jsx'
import Project from './Pages/Project/Project.jsx'
import NewProject from './Pages/Dashboard/NewProject/NewProject.jsx'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Home from './Pages/Home/Home.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import EditProject from './Pages/Dashboard/ProjectEdit/ProjectEdit.jsx';
const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects'>
            <Route index element={<Projects />} />
            <Route path=':id' element={<Project />} />
            <Route path=':id/edit' element={<EditProject />} />
            <Route path='new' element={<NewProject />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
