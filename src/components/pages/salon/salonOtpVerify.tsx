import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import {
  OTP_LENGTH,
  ValidationSchemaOTP,
} from "../../../validations/user/ValidationSchemaOtp";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";
import { FormValueOtp } from "../../../interfaces/user/FormValueOtp";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";

import { salonOtpVerify } from "../../../redux/actions/theaters/theaterActions";

function TheatreVerifyOtp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { salonOwner, loading, error } = useSelector(
    (state: RootState) => state.salon
  );

  useEffect(() => {
    console.log(salonOwner, "salon info inside verify-otp");
  }, [salonOwner]);

  const formik = useFormik<FormValueOtp>({
    initialValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },
    validationSchema: ValidationSchemaOTP,
    onSubmit: async (values) => {
      const { otp } = values;

      if (
        !salonOwner?.email ||
        !salonOwner?.userName ||
        !salonOwner?.password
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "salon details are not available. Please try again.",
        });
        return;
      }

      const salonDetails: SalonInterface = {
        email: salonOwner.email,
        userName: salonOwner.userName,
        password: salonOwner.password,
        role: "salon",
        status: "pending",
      };

      console.log(
        salonDetails,
        "salonDetails before passing to dispatch verify-otp"
      );

      try {
        await dispatch(salonOtpVerify({ otp, ...salonDetails })).unwrap();
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          text: "Wait For The Aprroval.",
        }).then(() => {
          navigate("/");
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An unexpected error occurred",
        });
      }
    },
  });

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData("text") || "";
      if (pastedText.length === OTP_LENGTH && /^\d+$/.test(pastedText)) {
        const fieldValues = pastedText.split("");
        formik.setValues((prev) => ({
          ...prev,
          otp: fieldValues,
        }));
        inputRef.current[OTP_LENGTH - 1]?.focus();
      }
    };

    const firstInput = inputRef.current[0];
    firstInput?.addEventListener("paste", handlePaste as EventListener);

    return () => {
      firstInput?.removeEventListener("paste", handlePaste as EventListener);
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (/\D/.test(value)) return; // Ignore non-digit input
    const currentOTP = [...formik.values.otp];
    currentOTP[index] = value.slice(-1);
    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP,
    }));

    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && index > 0 && !formik.values.otp[index]) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const renderInput = () => {
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={value}
        name={`otp[${index}]`}
        className="w-16 h-12 rounded-md mr-3 text-center text-xl text-black"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6db8f2]">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-3xl mb-8">Please Fill In The OTP</h3>
        <div>{renderInput()}</div>
        {formik.errors.otp && (
          <p className="mt-3 text-sm text-red-400">{formik.errors.otp}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-32 border border-solid rounded hover:bg-[#252525] hover:border-[#3b3b3b]"
          style={{
            backgroundColor: "#f57792",
            borderColor: "#f57792",
            color: "#fff",
          }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default TheatreVerifyOtp;
