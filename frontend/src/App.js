import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Logout from './Components/Header/Logout/Logout.jsx'
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetailsPage from './Pages/ProjectDetailsPage/ProjectDetailsPage.jsx'
import NewProjectPage from './Pages/Dashboard/NewProjectPage/NewProjectPage.jsx'
import About from './Pages/About/About.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import EditProject from './Pages/Dashboard/ProjectEdit/ProjectEdit.jsx'
import ImageUpload from './Components/ImageUpload/ImageUpload.jsx'
import ImageSetting from './Components/ImageSetting/ImageSetting.jsx'
import ImagedDetails from './Components/ImageDetails/ImageDetails.jsx'
import ImageEdit from './Components/ImageEdit/ImageEdit.jsx'
import Playground from './Components/Playground/Playground.jsx'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import BlogPostSettingsComponent from './Components/BlogPostSettingsComponent/BlogPostSettingsComponent'
import BlogPostsReadAllPage from './Components/BlogPostsReadAllPage/BlogPostsReadAllPage'
import BlogPostCreateComponent from './Components/BlogPostCreateComponent/BlogPostCreateComponent'
import BlogPostEditComponent from './Components/BlogPostEditComponent/BlogPostEditComponent.jsx'
import BlogPostReadOneComponent from './Components/BlogPostReadOneComponent/BlogPostReadOneComponent.jsx'
import SkillsReadAllPage from './Components/SkillsReadAllPage/SkillsReadAllPage'
import SkillsCreateComponent from './Components/SkillsCreateComponent/SkillsCreateComponent'
import SkillsEditComponent from './Components/SkillsEditComponent/SkillsEditComponent'
import SkillsReadOneComponent from './Components/SkillsReadOneComponent/SkillsReadOneComponent'

const App = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname === '/dashboard' ? null : <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects'>
          <Route index element={<ProjectsPage />} />
          <Route path=':id' element={<ProjectDetailsPage />} />
          <Route path='new' element={<NewProjectPage />} />
          <Route path=':id/edit' element={<EditProject />} />
        </Route>
        <Route path='/blogposts'>
          <Route index element={<BlogPostsReadAllPage />} />
          <Route path='create' element={<BlogPostCreateComponent />} />
          <Route path=':id/edit' element={<BlogPostEditComponent />} />
          <Route path=':id' element={<BlogPostReadOneComponent />} />
        </Route>
        <Route path='/images'>
          <Route index element={<ImageSetting />} />
          <Route path=':id' element={<ImagedDetails />} />
          <Route path='upload' element={<ImageUpload />} />
          <Route path=':id/edit' element={<ImageEdit />} />
        </Route>
        <Route path='/skills'>
          <Route index element={<SkillsReadAllPage />} />
          <Route path='create' element={<SkillsCreateComponent />} />
          <Route path=':id/edit' element={<SkillsEditComponent />} />
          <Route path=':id' element={<SkillsReadOneComponent />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/playground' element={<Playground />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {location.pathname === '/' ? null : <Footer />}
    </>
  )
}

export default App
