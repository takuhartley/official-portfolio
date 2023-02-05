import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Logout from './Components/Logout/Logout.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Header from './Layout/Header/Header.jsx'
import Footer from './Layout/Footer/Footer.jsx'

import ImageUpload from './Components/ImageComponents/ImageUpload/ImageUpload.jsx'
import ImageSetting from './Components/ImageComponents/ImageSetting/ImageSetting.jsx'
import ImageDetails from './Components/ImageComponents/ImageDetailsComponent/ImageDetailsComponent.jsx'
import ImageEdit from './Components/ImageComponents/ImageEdit/ImageEdit.jsx'

import BlogPostSettingsComponent from './Components/BlogPostComponents/BlogPostSettingsComponent/BlogPostSettingsComponent'
import BlogPostsReadAllPage from './Components/BlogPostComponents/BlogPostsReadAllPage/BlogPostsReadAllPage'
import BlogPostCreateComponent from './Components/BlogPostComponents/BlogPostCreateComponent/BlogPostCreateComponent'
import BlogPostEditComponent from './Components/BlogPostComponents/BlogPostEditComponent/BlogPostEditComponent.jsx'
import BlogPostReadOneComponent from './Components/BlogPostComponents/BlogPostReadOneComponent/BlogPostReadOneComponent.jsx'

import SkillsReadAllPage from './Components/SkillComponents/SkillsReadAllPage/SkillsReadAllPage'
import SkillsCreateComponent from './Components/SkillComponents/SkillsCreateComponent/SkillsCreateComponent'
import SkillsEditComponent from './Components/SkillComponents/SkillsEditComponent/SkillsEditComponent'
import SkillsReadOneComponent from './Components/SkillComponents/SkillsReadOneComponent/SkillsReadOneComponent'

import Playground from './Components/Playground/Playground.jsx'

import NewProjectComponent from './Components/ProjectComponents/NewProjectComponent/NewProjectComponent.jsx'
import EditProject from './Components/ProjectComponents/ProjectEdit/ProjectEdit.jsx'
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetailsPage from './Pages/ProjectDetailsPage/ProjectDetailsPage.jsx'
import { useId } from 'react'
import HomePage from './Pages/HomePage/HomePage.jsx'
import AboutPage from './Pages/AboutPage/AboutPage.jsx'
import Dashboard from './Pages/DashboardPage/DashboardPage.jsx'

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
})

const App = () => {
  const passwordHintId = useId()
  console.log(passwordHintId)
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const location = useLocation()
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {location.pathname === '/dashboard' ? null : <Header />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects'>
            <Route index element={<ProjectsPage />} />
            <Route path='new' element={<NewProjectComponent />} />
            <Route path=':id' element={<ProjectDetailsPage />} />
            <Route path=':id/edit' element={<EditProject />} />
          </Route>
          <Route path='/blogposts'>
            <Route index element={<BlogPostsReadAllPage />} />
            <Route path='create' element={<BlogPostCreateComponent />} />
            <Route path=':id' element={<BlogPostReadOneComponent />} />
            <Route path=':id/edit' element={<BlogPostEditComponent />} />
          </Route>
          <Route path='/images'>
            <Route index element={<ImageSetting />} />
            <Route path='upload' element={<ImageUpload />} />
            <Route path=':id' element={<ImageDetails />} />
            <Route path=':id/edit' element={<ImageEdit />} />
          </Route>
          <Route path='/skills'>
            <Route index element={<SkillsReadAllPage />} />
            <Route path='create' element={<SkillsCreateComponent />} />
            <Route path=':id' element={<SkillsReadOneComponent />} />
            <Route path=':id/edit' element={<SkillsEditComponent />} />
          </Route>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/playground' element={<Playground />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {location.pathname === '/' ? null : <Footer />}
      </ThemeContext.Provider>
    </>
  )
}

export default App
