const express = require('express')
const projects = require('./data/projects')
const app = express()
app.get('/', (req, res) => {
  res.send('API is running nicely boss')
})
app.get('/api/projects', (req, res) => {
  res.json(projects)
})

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p._id === req.params.id)
  res.json(project)
})
app.listen(5000, console.log('Server running on port 5000'))
