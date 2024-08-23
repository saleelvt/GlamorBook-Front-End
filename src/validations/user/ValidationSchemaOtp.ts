import * as Yup from "yup";

export const OTP_LENGTH = 6;
export const ValidationSchemaOTP = Yup.object().shape({
    otp: Yup.array()
      .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
      .length(OTP_LENGTH, `Must be exactly ${OTP_LENGTH} digits`),
  });
  