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
          sub: user._id
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
// User.findOne({ email: userData.email }, (err, user) => {
//   if (err) { return done(err); }
//
//   if (!user) {
//     const error = new Error('Incorrect email or password');
//     error.name = 'IncorrectCredentialsError';
//
//     return done(error);
//   }
//
//   // check if a hashed user's password is equal to a value saved in the database
//   return user.comparePassword(userData.password, (passwordErr, isMatch) => {
//     if (err) { return done(err); }
//
//     if (!isMatch) {
//       const error = new Error('Incorrect email or password');
//       error.name = 'IncorrectCredentialsError';
//
//       return done(error);
//     }
//
//     const payload = {
//       sub: user._id
//     };
//
//     // create a token string
//     const token = jwt.sign(payload, config.jwtSecret);
//     const data = {
//       name: user.name
//     };
//
//     return done(null, token, data);
//   });
// });
