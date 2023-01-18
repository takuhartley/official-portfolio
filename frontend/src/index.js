import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
const root = ReactDOM.createRoot(document.getElementById('root'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>
  }
])
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
reportWebVitals()
