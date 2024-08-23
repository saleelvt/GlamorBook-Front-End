
import * as  Yup from 'yup'

export const validatePhoneNumber = Yup.object().shape({
  number: Yup.string()
  .matches(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 digits',
    excludeEmptyString: true, // Exclude empty string to not show this error when the field is empty
  })
  .required('Phone number is required')
  });

  export const validateOtp = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
      .required('OTP is required')
      .max(6, 'Must be 6 digits'),
  });

  export const validateSignup = Yup.object().shape({
    userName: Yup.string()
      .required('First name is required')
      .min(2, ' at least 2 characters')
      .max(25, ' at most 50 characters'),
    
   
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),


      password:Yup.string()
      .required('Password is required')
      .min(6, ' at least 6 characters')
      .max(20, ' at most 20 characters'),
  }); 
  // export const validatePassword= Yup.object().shape({
    
  // })
  
export default {
    validatePhoneNumber,
    validateOtp,
    validateSignup
}