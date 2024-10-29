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



const SalonServiceList: FC = React.memo(() => {
  // import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
  const navigate = useNavigate();
  const [services, SetServices] = useState<ServiceInterface[]>([]);
  const { userData, role } = useSelector((state: RootState) => state.auth);
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
        // console.log("77777777777777777777777777",response.data.data);
        SetServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [salonIdForPorpuse, role]);
  console.log("vavevaaveeeeeeeeeveevevaaaavaaavvaaaaa", services);



  const hadleDelete = async (id:any) => {
    try {
      if (id) {
        await commonRequest("DELETE",`/salon/deleteService/${id}`,config)
        toast.success('Service Successfully Deleted')
        SetServices(services.filter((x)=> x._id !== id))
      }
    } catch (error) {
      console.log(error, "muy roirri");
    }
  }


  return (
    <div className="">
      <div className="  py-4 ">
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
                  className="text-sm font-serif px-2 bg-gradient-to-b  from-green-500 via-green-700 to-green-900 rounded-md  hover:scale-105 transition-transform duration-300 ease-in-out   p-1"
                >
                  Update
                </button>
                <button   onClick={() => {hadleDelete(x._id)}} className="text-sm px-2 font-serif bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md ml-4  hover:scale-105 transition-transform duration-300 ease-in-out  ">
                  delete
                </button>
                {/* Available Seats */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/addService");
        }}
        className="p-2 mt-12 text-sm font-serif bg-gradient-to-b hover:scale-105 transition-transform duration-300 ease-in-out from-green-500 via-green-700 to-green-900 rounded-md   "
      >
        Add Service{" "}
      </button>
    </div>
  );
});
export default SalonServiceList;
