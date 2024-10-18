import React, { useEffect, useRef, useState } from "react";
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

import { salonOtpVerify } from "../../../reduxKit/actions/salon/salonActions";
import { resendOTP } from "../../../reduxKit/actions/user/userActions";

function SalonVerifyOtp() {
  // const [timer,setTimer]= useState(60)
  const [resendEnabled,setResendEnabled]=useState(false)
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
        status: "active",
        city:salonOwner.city,
        state:salonOwner.state,
        latitude:salonOwner.latitude,
        longitude:salonOwner.longitude,
        salonName:salonOwner.salonName,
        seat:salonOwner.seat,
        profilePicture:salonOwner.profilePicture,
        images:salonOwner.images,
        licenseDocument:salonOwner.licenseDocument,
        phone:salonOwner.phone,
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
          toast:true,
          timer:1000,
        }).then(() => {
          navigate("/salonLogin");
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




  const initialTime=60

  const [timer,setTimer]=useState<number>(()=>{
    const savedTime= localStorage.getItem("countdownTimer")
    return savedTime ? parseInt(savedTime, 10):initialTime
  })









useEffect(()=>{

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let countdown:any

  if(timer>0){
    countdown= setTimeout(()=> setTimer((prev)=> { 
      const newTime=  prev-1
      localStorage.setItem("countdownTimer",newTime.toString())
      return newTime
    }) ,1000)
  }else{
    setResendEnabled(true)
    localStorage.removeItem("countdownTimer");
  }
  return ()=> clearTimeout(countdown)

},[timer])


const  handleResedOtpSalon= async()=>{

  if(!salonOwner?.email){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Salon email is not available. Redirecting to the signup page.",
    }).then(() => {
      navigate("/salonSignUp");
    });
    return;
  }

  console.log('my salon email for resend otp ', salonOwner.email);

  try {
    
    await dispatch(resendOTP({email:salonOwner.email}))
    setTimer(60)
    setResendEnabled(false)
    Swal.fire({
      icon: "success",
      title: "OTP Resent Successfully",
      text: "Please check your email for the new OTP.",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "An unexpected error occurred",
    });
  }
};


















  
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
        className="w-16 h-12 border bg-gray-300 border-black rounded-md mr-3 text-center text-xl text-black"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };







  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-3xl mb-8">Please Fill In The OTP</h3>
        <div className="rounded-sm ">{renderInput()}</div>
        {formik.errors.otp && (
          <p className="mt-3 text-sm text-red-400">{formik.errors.otp}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-32 border border-solid rounded bg-gradient-to-b from-green-500 via-green-700 to-green-900"
          style={{
        
            borderColor: "#f57792",
            color: "#fff",
          }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}


      { resendEnabled ? (
        <button
        type="submit"
        onClick={handleResedOtpSalon}
        className="mt-4  lg:ml-48 w-32 border border-solid rounded bg-gradient-to-b from-green-500 via-green-700 to-green-900"
        style={{
      
          borderColor: "#f57792",
          color: "#fff",
        }}
        disabled={loading}
      >
       Resend 
      </button>
      ) : (
        <p className="mt-3  text-sm text-red-600">
        Resend OTP in {timer} seconds
      </p>
      ) }

      




      </form>
    </div>
  );
}

export default SalonVerifyOtp;
