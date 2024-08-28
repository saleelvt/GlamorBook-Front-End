import * as yup from "yup";

export const ValidationLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
});
