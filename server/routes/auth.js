import express from 'express'
import User from '../models/users-model'
import jwt from 'jsonwebtoken'
import config from '../../config/index'

let router = express.Router()

router.post('/',(req,res)=>{
  const {email,password} = req.body

  User.findOne({ email: email }).exec().then(user =>{
    if (user) {
      const isMatch = user.comparePassword(password,user.password)
      if (!isMatch) {
          res.status(200).json({errors: {form: "Incorrect Credentials "}})
      }else{
        const payload = {
          email: user.email
        }
        // create a token string
        const token = jwt.sign(payload, config.jwtSecret);
        res.status(200).json({token})
      }
    }else{
       res.status(200).json({errors: { form : "Incorrect Credentials " } })
    }
  })
})

export default router
