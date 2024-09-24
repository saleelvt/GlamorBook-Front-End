import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { ValidationSchema } from "../../../validations/salon/signupSalonValidation";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { signupSalon } from "../../../reduxKit/actions/salon/salonActions";
import { NavLink } from "react-router-dom";
import MapPicker from "../../mapComponent/mapSalon";
import { Image } from "@nextui-org/react";
import ImageUpload from "../../imageUpload/cloudinary";




const SalonSignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.salon);

  const [showPassword, setShowPassword] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    formik.setFieldValue("latitude", lat);
    formik.setFieldValue("longitude", lng);
  };



  const [profilePictureForm,setProfilePictureForm]=useState <File|null>(null)
  const [licenseDocumentForm, setLicenseDocumentForm] = useState<File | null>(null);
  // const [images,setImages]=useState<File[]>([])




  const handleFileCahange =(e: React.ChangeEvent<HTMLInputElement>)=>{

    const {id,files} = e.target
    const file = files?.[0] || null;

    // if (files && files.length > 0) {
    //   formik.setFieldValue(id, files[0]);
    // }

    switch(id){

      case "profilePicture":
        setProfilePictureForm(file);
        break;

      case   "licenseDocument" :setLicenseDocumentForm(file);
      break
        default:
         break;
    }



  }
















  const initialValues: SalonInterface = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    salonName: "",
    city: "",
    state: "",
    phone: "",
    latitude: null,
    longitude: null,
    role: "salon",
    status: "pending",
    profilePicture: "",
    images: [],
    licenseDocument: "",
    seat: [{ seatNumber: 2, description: "" }],
  };






















  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
    
      console.log("the signup values got ", values);

      try {
        
        const profilePicture= profilePictureForm ? await ImageUpload(profilePictureForm) : ""
        const licenseDocument= licenseDocumentForm ? await ImageUpload(licenseDocumentForm) : ''
        
        
        // console.log("__________________ it is my data __",profilePicture);
        // console.log("__________________ it alsos __",licenseDocument);
         
           const latestData = {
             ...values,
             profilePicture,
             licenseDocument,

           }

           console.log(' this data for last submitin', latestData);
           

        await dispatch(signupSalon(latestData)).unwrap();

        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "You have successfully signed up! Please verify your email to continue.",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          timerProgressBar: true,
        }).then(() => {
          navigate("/salonOtpVerify");
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Signup failed:", err);
        Swal.fire({
          icon: "error",
          toast: true,
          timer: 2500,
          title: "Signup Failed",
          text: err.message || "Email Already Existed",
        });
        setSubmitting(false);
      }
    },
  });























  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-pink-300 to-yellow-200">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6">
        <div className="p-6 rounded-lg shadow-md w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Create An Account (Salon)
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-900">
                Username
              </label>
              <input
                id="userName"
                type="text"
                {...formik.getFieldProps("userName")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.userName}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-900">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("confirmPassword")}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="salonName" className="block text-gray-900">
                Salon Name
              </label>
              <input
                id="salonName"
                type="text"
                {...formik.getFieldProps("salonName")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.salonName && formik.errors.salonName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.salonName}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-900">Salon Location</label>
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="w-full p-2 bg-blue-500 text-white rounded mt-1"
              >
                Fetch Location of Salon
              </button>
              {mapVisible && (
                <div className="mt-4">
                  <MapPicker onLocationSelect={handleLocationSelect} />
                  <button
                    type="button"
                    onClick={() => setMapVisible(false)}
                    className="mt-2 p-2 bg-red-500 text-white rounded"
                  >
                    Close Map
                  </button>
                </div>
              )}
              {formik.values.latitude && formik.values.longitude && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected Location: {formik.values.latitude.toFixed(6)},{" "}
                  {formik.values.longitude.toFixed(6)}
                </div>
              )}
              <input type="hidden" {...formik.getFieldProps("latitude")} />
              <input type="hidden" {...formik.getFieldProps("longitude")} />
              {(formik.touched.latitude && formik.errors.latitude) ||
              (formik.touched.longitude && formik.errors.longitude) ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.latitude || formik.errors.longitude}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-900">
                City
              </label>
              <input
                id="city"
                type="text"
                {...formik.getFieldProps("city")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-sm">{formik.errors.city}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-900">
                State
              </label>
              <input
                id="state"
                type="text"
                {...formik.getFieldProps("state")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.state && formik.errors.state ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.state}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-900">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...formik.getFieldProps("phone")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>





            <div className="mb-4">
              <label htmlFor="licenseDocument" className="block text-gray-900">
                License Document URL
              </label>
              <input
                id="licenseDocument"
                type="file"
                {...formik.getFieldProps("licenseDocument")}
                onChange={handleFileCahange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />

                {licenseDocumentForm && (
                <Image
                  src={URL.createObjectURL(licenseDocumentForm)}
                  alt="License Document Preview"
                  width={100}
                  height={100}
                  className="mt-2"
                />
              )}

              {formik.touched.licenseDocument &&
              formik.errors.licenseDocument ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.licenseDocument}
                </div>
              ) : null}
            </div>



            <div className="mb-4">
              <label htmlFor="profilePicture" className="block text-gray-900">
                Profile Picture URL
              </label>
              <input
                id="profilePicture"
                type="file"
                {...formik.getFieldProps("profilePicture")}
                onChange={handleFileCahange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900"
              />

              {profilePictureForm&& (
                <Image 
                src={URL.createObjectURL(profilePictureForm)}
                alt="Profile Preview"
                width={100}
                height={100}
                className="mt-2"
                />
              )}

              {formik.touched.profilePicture && formik.errors.profilePicture ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.profilePicture}
                </div>
              ) : null}
            </div>













            <div>
              {formik.values.seat?.map((seat, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="number"
                    value={seat.seatNumber}
                    onChange={(e) => {
                      const newSeats = [...formik.values.seat!];
                      newSeats[index].seatNumber =
                        parseInt(e.target.value) || 1; // Ensure seat number doesn't go below 1
                      formik.setFieldValue("seat", newSeats);
                    }}
                    className="w-1/2 p-2 border border-gray-300 rounded mr-2"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const newSeats = [...formik.values.seat!];
                      if (newSeats[index].seatNumber > 1) {
                        newSeats[index].seatNumber -= 1;
                      }
                      formik.setFieldValue("seat", newSeats);
                    }}
                    className="p-2 bg-red-500 text-white rounded mr-2"
                  >
                    Decrease
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const newSeats = [...formik.values.seat!];
                      newSeats[index].seatNumber += 1;
                      formik.setFieldValue("seat", newSeats);
                    }}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Increase
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 bg-gradient-to-tr from-pink-600 to-yellow-500 border border-gray-700 rounded-lg mt-1"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-900">
              Already have an account?{" "}
              <NavLink to="/salonLogin" className="text-red-600">
                Log in
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonSignUp;
