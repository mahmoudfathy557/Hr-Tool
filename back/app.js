require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const vacationRouter = require('./routes/vacation')
// middleware
app.use(express.json())
app.use(cors())

// routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/vacation', vacationRouter)

// products route

const port = process.env.PORT || 5000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
