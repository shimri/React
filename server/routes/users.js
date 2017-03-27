import express from 'express'
import commonValidations from '../shared/validations/signup'
import User from '../models/users-model'
import isEmpty from 'lodash/isEmpty'

let router = express.Router()

function validateInput(data,otherValidations){
  const {errors} = otherValidations(data)
  return User.findOne({email:data.email}).exec().then(user => {
    if (user) {
      errors.email = 'There is user with such email'
    }
    return{
      errors,
      isValid: isEmpty(errors)
    }
  })
}

router.post('/', (req, res) => {

  validateInput(req.body, commonValidations)
  .then(({errors,isValid}) => {
      if (isValid) {
        const {username,email,password} = req.body
        const newUser = new User({username,email,password})
        newUser.save()
        .then(user => res.json({success:true}))
        .catch(err => res.status(500).json({error:error}))
      } else {
          res.status(400).json(errors)
      }
  })

})

router.get('/:identifier',(req,res) =>{
  User.findOne({email:req.params.identifier},'email').exec().then(user => {
    res.json({user})
  })
})

export default router


// router.post('/', (req, res) => {
//   const { errors, isValid } = validateInput(req.body);
//
//   if (isValid) {
//     const {username,email,password} = req.body
//     const newUser = new User({username,email,password})
//     newUser.save((err) => {
//       if (err) {
//           if (err.code == 11000) {
//             return res.status(409).json({errors.email='This email is already taken.'})
//           }
//           res.status(500).json({errors:err})
//       }
//       else{
//           res.json({success:true})
//       }
//     })
//   } else {
//       res.status(400).json(errors)
//   }
// })





  // if (isValid) {
  //   const {username,email,password} = req.body
  //   const newUser = new User({username,email,password})
  //
  //   newUser.save((err) => {
  //     if (err) {
  //       return  res.status(500).json({errors:err})
  //     }
  //
  //     User.findOne({ username: username}, (err, user)=>{
  //      if (err) throw err;
  //
  //      // test a matching password
  //      user.comparePassword('Password123', function(err, isMatch) {
  //          if (err) throw err;
  //          console.log('Password123:', isMatch); // -> Password123: true
  //      })
  //
  //      // test a failing password
  //      user.comparePassword('123Password', function(err, isMatch) {
  //          if (err) throw err;
  //          console.log('123Password:', isMatch); // -> 123Password: false
  //      })
  //  })
  //
  //
  //
  //         res.json({success:true})
  //
  //   })
  // } else {
  //     res.status(400).json(errors)
  // }
