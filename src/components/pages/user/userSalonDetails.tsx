import React, { useEffect, useState } from "react";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { useParams, useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { FaClock } from "react-icons/fa";
// import {}
// const UserNavbar = lazy(() => import("../../Navbar/userNavbar"));
import UserNavbar from "../../Navbar/userNavbar";
// import UserNavbar from  lazy(()=> "../../Navbar/userNavbar")
import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
// import toast from "react-hot-toast";

const UserSalonDetailsPage: React.FC = () => {
  const [mySalon, setMySalon] = useState<SalonInterface | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const { salonId } = useParams<{ salonId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/admin/getSalonDetails/${salonId}`,
          config
        );
        setMySalon(response.data.data);
      } catch (error) {
        console.error("Failed to fetch salon details:", error);
      }
    };
    fetchSalonDetails();
  }, [salonId]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const  response= await commonRequest("GET",`/salon/getAllServices/${salonIdForPorpuse}`,config)
        const response = await commonRequest(
          "GET",
          `/salon/getAllServices/${salonId}`,
          config
        );
        // console.log("77777777777777777777777777",response.data.data);
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [salonId]);

  return (
    <div className="">
      <UserNavbar />
      <div className="flex flex-col items-center justify-center  min-h-screen p-6 ">
        <div className="w-full max-w-4xl mx-auto border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50  lg:mb-24 rounded-md shadow-xl p-8 transition  transform hover:-translate-y-1 hover:scale-100 duration-100">
          <div className="grid md:grid:cols-2  items-center">
            {/* Salon Profile Picture */}
            <div className="w-full md:w-1/1 md:grid md:place-items-center  grid place-content-center  sm:w-1/1 sm:grid sm:place-items-center  mb-6 md:mb-0 md:mr-8">
              <img
                src={
                  mySalon?.profilePicture || "https://via.placeholder.com/150"
                }
                alt={`${mySalon?.salonName} Profile`}
                className="rounded-lg object-cover w-48 h-48 shadow-md border-1"
              />
            </div>

            {/* Salon Details */}
            <div className="w-full md:w-2/3 text-center font-serif md:text-left ">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {mySalon?.salonName}
              </h2>
              <div className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">City: </span>
                {mySalon?.city}, {mySalon?.state}
              </div>
              <div className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Phone: </span>
                {mySalon?.phone}
              </div>

             
              {/* Previous Button */}
            </div>
            
          </div>
          <div  className=" py-4 grid lg:grid-cols-2 place-items-center   gap-4  sm:grid-cols-1">
                {services.length > 0
                  ? services.map((x, index) => (
                      <div className="shadow-lg     grid  w-10/12  border bg-white  border-gray-300 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div key={index} className="p-2 ">
                          {/* Service Name */}
                          <h2 className="text-xl font-medium  text-black mb-3">
                            {" "}
                            {x?.serviceName}
                          </h2>

                          {/* Service Price */}
                          <p className="text-gray-600 mb-2">
                            <span className="font-semibold">
                              {" "}
                              Price ₹{x?.price}
                            </span>
                          </p>
                          <p className="text-gray-600 ">
                            <span className="font-semibold flex items-center ">
                              <FaClock className="mr-1 text-green-900" />
                              {x?.duration}:00 Min
                            </span>
                          </p>

                          <div className="flex justify-end ">
                            <button className="text-sm font-serif bg-gradient-to-b  from-green-500 via-green-700 to-green-900 rounded-md  hover:scale-105 transition-transform duration-300 ease-in-out   p-1">
                              Update
                            </button>
                            <button className="text-sm font-serif bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md ml-4  hover:scale-105 transition-transform duration-300 ease-in-out  ">
                              delete
                            </button>

                            {/* Available Seats */}
                          </div>
                        </div>
                        
                      </div>
                    ))
                  :null}
                
              </div>
        </div>
        <div className=" grid w-full place-items-center  align-middle ">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="px-4  py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            Go Back
          </button>
        </div>
       
      </div>
      
    </div>
  );
};

export default UserSalonDetailsPage;
