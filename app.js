const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const indexRouter = require('./routes/index')

const port = process.env.PORT || 5000
const app = express()

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
//   res.header('Access-Control-Expose-Headers', 'Content-Length')
//   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-Width, Range')

//   if (req.method === 'OPTIONS') return res.sendStatus(200)
//   next()
// })

app.use(indexRouter)

const server = http.createServer(app)

// Setup socket.io with cors enabled.
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let interval

// Listen for the connection event.
io.on('connection', socket => {
  console.log('New client connected!')

  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000)

  socket.on('disconnect', () => {
    console.log('Client disconnected!')
    clearInterval(interval)
  })
})

const getApiAndEmit = socket => {
  const response = new Date()
  socket.emit('fromApi', response)
}

// Start server
server.listen(port, () => console.log(`Server running on port ${port}...`))
