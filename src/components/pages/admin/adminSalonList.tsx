import Navbar from "../../Navbar/adminNavbar";
import { commonRequest } from "../../../config/api";

import { useEffect, useState } from "react";

import Modal from "react-modal";

import { config } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

export interface Salon {
  _id?: string;
  userName?: string;
  email: string | null;
  profilePicture?: string | null;
  status: string | null;
  city: string | null;
}







const SalonList: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const navigate= useNavigate()










  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest("GET", "/admin/getSalons", config);
        // Ensure the response data is an array before setting the state  

         console.log('this si my data ', response.data.data);
         
        if (Array.isArray(response.data.data)) {
          setSalons(response.data.data);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (err) {
        setError("Failed to fetch theaters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);











  const handleBlockUnblock = async (
    id: string | undefined,
    status: string | null
  ) => {

    const newStatus = status === "blocked" ? "active" : "blocked";
         console.log('stat uus got ', newStatus);
         
    try {
      await commonRequest("PATCH", `/admin/${id}/changeStatus`, config, {
        status: newStatus,
      });

      setSalons(
        salons.map((Salon) =>
          Salon._id === id ? { ...Salon, status: newStatus } : Salon
        )
      );
    } catch (err) {
      console.error("Failed to update theater status", err);
    }
  };










  const handleAccept = async () => {
    if (selectedSalon?._id) {
      try {
        await commonRequest(
          "PATCH",
          `/admin/${selectedSalon._id}/acceptSalon`,
          config,
          { status: "active" }
        );

        setSalons(
          salons.map((Salon) =>
            Salon._id === selectedSalon._id
              ? { ...Salon, status: "active" }
              : Salon
          )
        );
        setIsModalOpen(false);
      } catch (err) {
        console.error("Failed to accept theater", err);
      }
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div className="">
      <Navbar />
      <div className=" bg-gray-200 min-h-screen ">
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Salon List </h1>
          <div className="grid  md:grid-cols-3  xs:grid-cols-3  sm:grid-cols-2   lg:grid-cols-4">
            {salons.map((Salon) => (
              <div key={Salon._id}   onClick={()=> navigate(`/admin/salon/${Salon._id}`)} className=" shadow-2xl  ml-12
              3 rounded-lg border-[0.9px]   border-black p-[0.9px]">
               
              
                <div className="flex justify-center items-center   ">
                  <img
                    src={Salon.profilePicture || "/default-profile.png"}
                    alt={`${Salon.userName}'s profile`}
                    className=" max-h-44  min-w-full rounded-lg shadow-xl"
                  />
                </div>



                <div className="text-center mt-2 mb-1 rounded-lg bg-slate-300">
                  <div className="font-bold">{Salon.userName}</div>
                  <div>{Salon.city}</div>
                <div className="text-center mb-2">


                  <span
                    className={`px-2 py-1 rounded-full text-xs bg-gray-300 ${
                      Salon.status === "active"
                        ? "bg-green-500"
                        : Salon.status === "blocked"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                   { Salon.status}
                  </span>
                </div>




                <div className="flex justify-center items-center">

                  {Salon.status === "rejected" && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => {
                        setSelectedSalon(Salon);
                        setIsModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className={`px-4 py-2 rounded ${
                      Salon.status === "blocked"
                        ? "bg-red-400"
                        : "bg-yellow-500"
                    } text-white`}
                    onClick={() => handleBlockUnblock(Salon._id, Salon.status)}
                  >
                    {Salon.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                </div>
              

                </div>


               



















              </div>



            ))}
          </div>
        </main>












        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Accept Salon"
          className="bg-gray-800 p-4 rounded-lg text-white max-w-md mx-auto my-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          ariaHideApp={false} // Disable hiding the app
        >
          <h2 className="text-xl mb-4">Accept Salon</h2>
          <p>
            Are you sure you want to accept the Salon "{selectedSalon?.userName}
            "?
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SalonList;