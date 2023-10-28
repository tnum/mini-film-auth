const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')

router.post('/register', async(req,res)=>{

  // Validation 1 to check user input
  const {error} = registerValidation(req.body)
  if(error) {
    return res.status(400).send({message: error['details'][0]['message']})
  }

  // Validation 2 to check if user exists.
  const userExists = await User.findOne({email: req.body.email})
  if(userExists) {
    return res.status(400).send({message: 'User already exists'})
  }

  const salt = await bcryptjs.genSalt(5)
  const hashedPassword = await bcryptjs.hash(req.body.password)

  // Code to insert data
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  try{
    const savedUser = await user.save()
    res.send(savedUser)
  } catch(err) {
    res.status(400).send({message:err})
  }

})

router.post('/login', async(req,res)=>{

})

module.exports = router