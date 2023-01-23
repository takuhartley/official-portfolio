import React, { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Unstable_Grid2'
import { listProjects } from '../../Redux/Actions/projectActions'
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import { useSpring, animated } from 'react-spring'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import '../../Components/ProjectCard/ProjectCard.scss'
import './Projects.scss'
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
const Projects = () => {
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList
  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid2
            xs
            display='flex'
            justifyContent='center'
            alignItems='center'
            container
            spacing={2}
            className='projects-grid'
          >
            {projects.map(project => (
              <Grid
                item
                xs={2}
                className='projects-grid-item'
                key={project._id}
              >
                <div id='project-card-container' className='project-card'>
                  <RouterLink to={`/projects/${project._id}`}>
                    <Card id='project-card'>
                      <div
                        className='project-card-thumbnail-container'
                        id='project-card-thumbnail-container'
                      >
                        <div className='overlay'></div>
                        {project.thumbnail && (
                          <img
                            src={`/Images/${project.thumbnail.filename}`}
                            alt={project.thumbnail.name}
                            id='project-card-thumbnail'
                            className='project-card-thumbnail'
                          />
                        )}
                      </div>
                      <div
                        className='project-card-header'
                        id='project-card-header'
                      >
                        <div
                          className='project-card-title-group'
                          id='project-card-title-group'
                        >
                          <h1
                            className='project-card-title'
                            id='project-card-title'
                          >
                            {project.title}
                          </h1>
                          <ArrowForwardIosRoundedIcon
                            id='project-card-arrow-icon'
                            className='project-card-arrow-icon'
                          />
                        </div>
                        <h3
                          className='project-card-subtitle'
                          id='project-card-subtitle'
                        >
                          {project.subTitle}
                        </h3>
                        <div
                          className='project-card-like'
                          id='project-card-like'
                        >
                          <p id='project-card-like-count'>{project.likes}</p>
                          <FavoriteBorderRoundedIcon
                            id='project-card-like-icon'
                            className='project-card-like-icon'
                          />
                        </div>
                      </div>
                    </Card>
                  </RouterLink>
                </div>
              </Grid>
            ))}
          </Grid2>
        </Box>
      )}
    </>
  )
}

export default React.memo(Projects)
