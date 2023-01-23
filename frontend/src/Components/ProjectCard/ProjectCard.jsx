import React, { useState, useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import './ProjectCard.scss'
const DAMPEN = 50
const CONFIG = { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
const CARD_CLASS = 'card'
const CARD_HOVERED_CLASS = 'card--hovered'
const Z_INDEX_HOVERED = 2
const Z_INDEX_NOT_HOVERED = 1

function Card ({ children }) {
  // We add this ref to card element and use in onMouseMove event ...
  // ... to get element's offset and dimensions.
  const ref = useRef()

  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false)

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [1, 1, 1],
      // Setup physics
      config: CONFIG
    }
  })

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseMove = ({ clientX, clientY }) => {
    // Get mouse x position within card
    const x = clientX - (ref.current.offsetLeft - window.scrollX)

    // Get mouse y position within card
    const y = clientY - (ref.current.offsetTop - window.scrollY)

    // Set animated values based on mouse position and card dimensions
    const xys = [
      -(y - ref.current.clientHeight / 2) / DAMPEN,
      (x - ref.current.clientWidth / 2) / DAMPEN,
      1.07
    ]

    // Update values to animate to
    setAnimatedProps({ xys: xys })
  }
  const handleMouseLeave = () => {
    setHovered(false)
    setAnimatedProps({ xys: [0, 0, 1] })
  }

  return (
    <>
      <animated.div
        ref={ref}
        className={`${CARD_CLASS} ${isHovered ? CARD_HOVERED_CLASS : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          // If hovered we want it to overlap other cards when it scales up
          zIndex: isHovered ? Z_INDEX_HOVERED : Z_INDEX_NOT_HOVERED,
          transform: animatedProps.xys.to(
            (x, y, s) =>
              `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
          )
        }}
      >
        {children}
      </animated.div>
    </>
  )
}

const ProjectCard = ({ projectData }) => {
  const [formData, setFormData] = useState({
    id: '',
    thumbnailId: '',
    filename: '',
    name: '',
    title: '',
    subTitle: '',
    likes: ''
  })
  const projectId = projectData._id
  const dispatch = useDispatch()
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  useEffect(() => {
    if (!formData._id || project._id !== projectId)
      dispatch(listProjectDetails(projectId))
  }, [dispatch, formData._id, project._id, projectData._id, projectId])
  useEffect(() => {
    if (!formData.id) {
      setFormData({
        id: project._id,
        thumbnailId: project.thumbnail._id,
        filename: project.thumbnail.filename,
        title: project.title,
        subTitle: project.subTitle,
        likes: project.likes
      })
    }
  }, [
    formData.id,
    project._id,
    project.likes,
    project.subTitle,
    project.thumbnail._id,
    project.thumbnail.filename,
    project.title,
    projectData
  ])

  return (
    <>
      <div id='project-card-container' className='project-card'>
        <RouterLink to={`/projects/${project._id}`}>
          <Card id='project-card'>
            <div
              className='project-card-thumbnail-container'
              id='project-card-thumbnail-container'
            >
              <div className='overlay'></div>
              <img
                src={`/Images/${formData.filename}`}
                alt={formData.name}
                id='project-card-thumbnail'
                className='project-card-thumbnail'
              />
            </div>
            <div className='project-card-header' id='project-card-header'>
              <div
                className='project-card-title-group'
                id='project-card-title-group'
              >
                <h1 className='project-card-title' id='project-card-title'>
                  {formData.title}
                </h1>
                <ArrowForwardIosRoundedIcon
                  id='project-card-arrow-icon'
                  className='project-card-arrow-icon'
                />
              </div>
              <h3 className='project-card-subtitle' id='project-card-subtitle'>
                {formData.subTitle}
              </h3>{' '}
              <div className='project-card-like' id='project-card-like'>
                <p id='project-card-like-count'>{formData.likes}</p>
                <FavoriteBorderRoundedIcon
                  id='project-card-like-icon'
                  className='project-card-like-icon'
                />
              </div>
            </div>
          </Card>
        </RouterLink>
      </div>
    </>
  )
}

export default ProjectCard
