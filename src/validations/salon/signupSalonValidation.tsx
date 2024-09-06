import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username cannot exceed 10 characters")
    .matches(/^\S*$/, "Username cannot contain spaces")
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
    )
    .max(10, "Must be less than 10 characters"),

  confirmPassword: yup
    .string()
    .required("confirm your Password")
    .oneOf([yup.ref("password")], "Passwords must Match"),

  salonName: yup.string().required("Salon Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  licenseDocument: yup.string().required("License document is required"),
  profilePicture: yup.string().required("Profile picture is required"),
  images: yup.array().min(1, "At least one salon image is required"),
  
  seat: yup.array().of(
    yup.object().shape({
      seatNumber: yup.number().required("Seat number is required"),

    })
  ),
  latitude: yup
  .number()
  .required("Location is required. Please fetch salon location.")
  .typeError("Location is required. Please fetch salon location."),

longitude: yup
  .number()
  .required("Location is required. Please fetch salon location.")
  .typeError("Location is required. Please fetch salon location."),
});
