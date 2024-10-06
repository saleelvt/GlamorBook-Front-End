import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { useEffect, useState } from "react";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";



export const SalonProfilePage: React.FC = () => {


 const [myProfile,setMyProfile]=useState<SalonInterface|null>()

    const {role,userData}=useSelector((state:RootState)=> state.auth,)
     const salonIdForPorpuse = userData?._id 
    //   migth be id is null 
    console.log("thi data for the salonProfile page ", role,salonIdForPorpuse);

    
    useEffect(()=>{

      const  fetchProfile= async ()=>{

     
            console.log("this line for show the salonid purpus ",salonIdForPorpuse);
           
           const response=  await commonRequest("GET",`/salon/getSalonProfile/${salonIdForPorpuse}`,config)

        
             setMyProfile(response.data.data)
      }
       fetchProfile()
    },[salonIdForPorpuse,role])
    
 

    if(myProfile){

        console.log("macha saanam kititi ", myProfile);
        
    }




  const salonData = {
    userName: "John Doe",
    email: "john@example.com",
    salonName: "Luxury Salon",
    city: "New York",
    state: "NY",
    phone: "123-456-7890",
    profilePicture:
      "https://res-console.cloudinary.com/dllmjze4p/thumbnails/v1/image/upload/v1727847428/ZnJvZ290ZVBhc3NHX2lyam1nbA==/drilldown",
    licenseDocument: "1234567890",
    status: "active",
    comments: "Our salon provides the best services in town.",
    seat: [
      { seatNumber: 1, description: "VIP seat" },
      { seatNumber: 2, description: "Standard seat" },
    ],
    latitude: 40.7128,
    longitude: -74.006,
  };

  
  return (
    <div className="max-w-4xl mx-auto p-6 lg:mt-14 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
          {salonData.profilePicture ? (
            <img
              src={salonData.profilePicture}
              alt={`${salonData.salonName} Profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Basic Details */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {salonData.salonName || salonData.userName}
          </h2>
          <p className="text-sm text-gray-600">{salonData.email}</p>
          <p className="text-sm text-gray-600">
            {salonData.phone || "No phone available"}
          </p>
          <p className="text-sm text-gray-600">
            {salonData.city
              ? `${salonData.city}, ${salonData.state}`
              : "Location not provided"}
          </p>
        </div>

        {/* License and Status */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">
            License:{" "}
            <span className="font-semibold">
              {salonData.licenseDocument || "N/A"}
            </span>
          </p>
          <p
            className={`text-sm font-semibold ${
              salonData.status === "active" ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {salonData.status || "Unknown"}
          </p>
        </div>
      </div>

      {/* Comments and Seats */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Additional Information
        </h3>
        <p className="text-gray-600">
          {salonData.comments || "No additional comments available"}
        </p>
      </div>

      {/* Seats Section */}
      {salonData.seat && salonData.seat.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Seats Available
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {salonData.seat.map((seat, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <p className="font-semibold">Seat {seat.seatNumber}</p>
                <p className="text-sm text-gray-600">
                  {seat.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location (Latitude and Longitude) */}
      {salonData.latitude && salonData.longitude && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
          <p className="text-gray-600">
            Latitude: {salonData.latitude}, Longitude: {salonData.longitude}
          </p>
        </div>
      )}
    </div>
  );
};
