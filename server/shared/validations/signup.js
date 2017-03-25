import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
  let errors = {}

  if (!data || typeof data.username !== 'string' || data.username.trim().length === 0) {
    errors.username = 'Please provide a correct user name'
  }

  if (!data || typeof data.email !== 'string' || !Validator.isEmail(data.email)) {
    errors.email = 'Please provide a correct email address'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required'

  }
  if (!Validator.equals(data.password,data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match'
  }
  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}
