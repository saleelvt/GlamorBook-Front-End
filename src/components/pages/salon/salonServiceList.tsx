/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
import { commonRequest } from "../../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { config } from "../../../config/constants";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../../validations/salon/addServiceValidation";

const SalonServiceList: FC = React.memo(() => {
  // import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
  const navigate = useNavigate();
  const [services, SetServices] = useState<ServiceInterface[]>([]);
  const { userData, role } = useSelector((state: RootState) => state.auth);
  const [editService, setEditService] = useState<ServiceInterface | null>(null);
  const salonIdForPorpuse = userData?._id;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const  response= await commonRequest("GET",`/salon/getAllServices/${salonIdForPorpuse}`,config)
        const response = await commonRequest(
          "GET",
          `/salon/getAllServices/${salonIdForPorpuse}`,
          config
        );

        SetServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [salonIdForPorpuse, role]);

  const hadleDelete = async (id: any) => {
    try {
      if (id) {
        await commonRequest("DELETE", `/salon/deleteService/${id}`, config);
        toast.success("Service Successfully Deleted");
        SetServices(services.filter((x) => x._id !== id));
      }
    } catch (error) {
      console.log(error, "muy roirri");
    }
  };

  const handleUpdate = async (x: ServiceInterface) => {
    try {
      if (x) {
        setEditService(x);
      }
    } catch (error) {
      console.log(error, "muy roirri");
    }
  };
  return (
    <div className="">
      <div style={{ display: editService ? "none" : "block" }} className="">
        {services.map((x, index) => (
          <div className="shadow-lg px-4  mt-8  bg-green-50    ml-5 grid w-1/2   border  border-gray-300 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
            <div key={index} className="p-4 ">
              {/* Service Name */}
              <h2 className="text-xl font-medium  text-black mb-3">
                {" "}
                {x?.serviceName}
              </h2>

              {/* Service Price */}
              <p className="text-gray-600 mb-2">
                <span className="font-semibold"> Price ₹{x?.price}</span>
              </p>
              <p className="text-gray-600 ">
                <span className="font-semibold flex items-center ">
                  <FaClock className="mr-1 text-green-900" />
                  {x?.duration}:00 Min
                </span>
              </p>

              <div className="flex justify-end  bg-green-50">
                <button
                  onClick={() => {
                    handleUpdate(x);
                  }}
                  className="text-sm font-serif px-2 bg-gradient-to-b  from-green-500 via-green-700 to-green-900 rounded-md  hover:scale-105 transition-transform duration-300 ease-in-out   p-1"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    hadleDelete(x._id);
                  }}
                  className="text-sm px-2 font-serif bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md ml-4  hover:scale-105 transition-transform duration-300 ease-in-out  "
                >
                  delete
                </button>
                {/* Available Seats */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {editService && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-serif text-gray-800 mb-5">
              Edit Service
            </h2>
            <Formik
              initialValues={{
                serviceName: editService.serviceName,
                price: editService.price,
                duration: editService.duration,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const updatedService: ServiceInterface = {
                  ...editService,
                  ...values,
                };
                console.log("this is the values of update ", updatedService);
                await commonRequest(
                  "PUT",
                  `/salon/updateService/${updatedService._id}`,
                  config,
                  updatedService
                );
                toast.success("Service Successfully updated ");
                navigate(-1);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="serviceName"
                    >
                      Service Name:
                    </label>
                    <Field
                      name="serviceName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter service name"
                    />
                    <ErrorMessage
                      name="serviceName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="price"
                    >
                      Price (INR):
                    </label>
                    <Field
                      name="price"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter price"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="duration"
                    >
                      Duration (minutes):
                    </label>
                    <Field
                      name="duration"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter duration in minutes"
                    />
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="p-2 text-sm font-serif bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md shadow-md hover:scale-105 transition-transform duration-300 ease-in-out text-white"
                    >
                      {isSubmitting ? "Updating..." : "Update Service"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditService(null)}
                      className="p-2 text-sm font-serif bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 rounded-md shadow-md hover:scale-105 transition-transform duration-300 ease-in-out text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {!editService && (
        <button
          onClick={() => {
            navigate("/addService");
          }}
          className="p-2 mt-12 text-sm font-serif bg-gradient-to-b hover:scale-105 transition-transform duration-300 ease-in-out from-green-500 via-green-700 to-green-900 rounded-md   "
        >
          Add Service{" "}
        </button>
      )}
    </div>
  );
});
export default SalonServiceList;
