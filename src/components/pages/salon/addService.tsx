import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {validationSchema} from "../../../validations/salon/addServiceValidation"
import Navbar from "../../Navbar/salonNavbar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { SalonAddService } from "../../../reduxKit/actions/salon/salonActions";
import { useDispatch } from "react-redux";
import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
import toast from "react-hot-toast";


const AddServiceForm: React.FC = React.memo(() => {
  const dispatch= useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const {userData}=useSelector((state:RootState)=> state.auth)
     const _id = userData?._id 
     console.log("saleelis44444444 a",_id);

  // Handle form submission
  const handleSubmit = useCallback(async(values: ServiceInterface, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void; }) => {
    setSubmitting(true);
    // Simulate an API call with a timeout
      const  a = {_id,...values}
      console.log(a,'fdddddfdfdvvvvvvvvvvvvvvvvvvvdddddd');
     try {
       await dispatch(SalonAddService(a)).unwrap()
       toast.success("Service added successfully done ");
      //  setTimeout(()=>{
         resetForm(); // Reset the form after submission
         navigate(-1)
      //  },1000)
     } catch (error) {
      console.error("Error adding service:", error);
    } finally {
        setSubmitting(false); // End the loading state after delay
     
    }
  }, [_id, dispatch]);
  const backpage=  useCallback(()=>{
             navigate(-1)
  },[navigate])

  return (
<div className="">
        <Navbar/>
    <div className="p-6 max-w-2xl mx-auto ">
      {/* Form Container */}
      <div className="shadow-lg px-4 bg-green-50 border border-gray-400 rounded-lg overflow-hidden">
        <div className="p-5">
          <h2 className="text-xl font-serif text-gray-800 mb-3">Add Service</h2>

          <Formik
            initialValues={{ serviceName: "", price: 0, duration: 0 }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Service Name */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2" htmlFor="serviceName">
                    Service Name:
                  </label>
                  <Field
                    name="serviceName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter service name"
                  />
                  <ErrorMessage name="serviceName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Service Price */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2" htmlFor="price">
                    Price (INR):
                  </label>
                  <Field
                    name="price"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter price"
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Service Duration */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2" htmlFor="duration">
                    Duration (minutes):
                  </label>
                  <Field
                    name="duration"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter duration in minutes"
                  />
                  <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit and Back Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-2 text-sm font-serif bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md shadow-md hover:scale-105 transition-transform duration-300 ease-in-out text-white"
                  >
                    {isSubmitting ? "Adding..." : "Add Service"}
                  </button>

                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={backpage}
                    className="backbutton p-2 text-sm font-serif bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 rounded-md shadow-md hover:scale-105 transition-transform duration-300 ease-in-out text-white"
                  >
                    Back
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </div>
  );
})

export default AddServiceForm;
