import express from 'express'
import validateInput from '../shared/validations/signup'
import User from '../models/users-model'

let router = express.Router()

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const {username,email,password} = req.body
    const newUser = new User({username,email,password})
    newUser.save((err) => {
      if (err) { res.status(500).json({errors:err})}
      res.json({success:true})
    })
  } else {
      res.status(400).json(errors)
  }
})

export default router
