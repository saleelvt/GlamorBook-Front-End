import { FC } from "react";
import { useNavigate } from "react-router-dom";

const SalonServiceList: FC = () => {
    // import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";
    const navigate = useNavigate();

  return (
    <div className=" ">
      <div className="flex  px-4">
        <div className="shadow-lg px-4 bg-white border border-gray-400 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="p-5">
            {/* Service Name */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {" "}
              Service Name :fdkjfkdjfkd
            </h2>

            {/* Service Price */}
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Price:</span> $489394
            </p>

            {/* Service Duration */}
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Duration:</span>49 minutes
            </p>

            {/* Available Seats */}
          </div>
        </div>
       
      </div>
      <button  onClick={()=>{navigate('/addService')}} className="p-2 mt-12 text-sm font-bold bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md   ">
        Add Service{" "}
      </button>
    </div>
  );
};
export default SalonServiceList;
