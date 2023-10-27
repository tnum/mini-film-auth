const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const filmsRoute = require('./routes/films')
const authRoute = require('./routes/auth')

app.use('/api/film', filmsRoute)
app.use('/api/user', authRoute)

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
  console.log('Database connected!')
}).catch((err)=>{
  console.log(err)
})

app.listen(3000, ()=>{
  console.log('Server is running...')
})