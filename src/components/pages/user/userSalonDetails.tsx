import React, { useEffect, useState } from "react";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { useParams, useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
// import {}
import UserNavbar from "../../Navbar/userNavbar";

const UserSalonDetailsPage: React.FC = () => {
  const [mySalon, setMySalon] = useState<SalonInterface | null>(null);
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

  return (
    <div className="">
      <UserNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
        <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50  lg:mb-24 rounded-md shadow-xl p-8 transition  transform hover:-translate-y-1 hover:scale-100 duration-100">
          <div className="flex flex-col md:flex-row items-center">
            {/* Salon Profile Picture */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
              <img
                src={
                  mySalon?.profilePicture || "https://via.placeholder.com/150"
                }
                alt={`${mySalon?.salonName} Profile`}
                className="rounded-lg object-cover w-48 h-48 shadow-md border-1"
              />
            </div>

            {/* Salon Details */}
            <div className="w-full md:w-2/3 text-center md:text-left">
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
              <h1>SERVICES : ""</h1>
              <div className="text-lg text-gray-600 mb-4">
                {/* <span className="font-semibold">Seats Available: </span>{mySalon?.seat} */}
              </div>
              {/* Previous Button */}
            </div>
          </div>
        </div>
        <div className="flex  w-44 ">
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





