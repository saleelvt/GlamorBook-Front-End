import Navbar from "../../Navbar/adminNavbar";
import { commonRequest } from "../../../config/api";
import { Loading } from "../Loading";

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
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest("GET", "/admin/getSalons", config);
        // Ensure the response data is an array before setting the state

        console.log("this si my data ", response.data.data);

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
    console.log("stat uus got ", newStatus);

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

















  const handleDeleteSalon =  async(Id: string) => {
    setRejectModalOpen(false);

   try {
    await commonRequest("DELETE",`/admin/${Id}/deleteSalon`,config)
    setSalons(salons.filter((salon) => salon._id !==Id))
    // navigate(-1)
    
   }catch (err) {
      console.error("Failed to delete theater", err);
    }
  };








  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md w-full max-w-md">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
            <span className="font-bold">Error:</span>
          </div>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Navbar />

      <div className=" bg-gray-200 min-h-screen ">

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Salon List </h1>
          <div className="grid  flex justify-center  md:grid-cols-3  xs:grid-cols-3  sm:grid-cols-2    lg:grid-cols-4 ">
            {salons.map((Salon) => (
              <div className=" shadow-2xl  ml-12  mt-12 rounded-lg border-[0.9px]   border-black p-[0.9px]">
                <div
                  key={Salon._id}
                  onClick={() => navigate(`/admin/salon/${Salon._id}`)}
                  className="flex justify-center items-center"
                >
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
                      {Salon.status}
                    </span>
                  </div>

                  <div className="flex justify-center items-center">
                    {Salon.status === "rejected" && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSalon(Salon);
                          setRejectModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    )}

                    <button
                      disabled={Salon.status === "rejected" || Salon.status=== "pending"}
                      className={`px-4 py-2 rounded ${
                        Salon.status === "blocked"
                          ? "bg-red-400"
                          : Salon.status === "rejected"
                          ? "bg-gray-400 cursor-not-allowed"
                          : Salon.status==="pending" ? "bg-gray-400 cursor-not-allowed"  : "bg-yellow-500"
                      } text-white`}
                      onClick={() =>
                        handleBlockUnblock(Salon._id, Salon.status)
                      }
                    >
                      {Salon.status === "blocked"  ? "Unblock": Salon.status === "rejected" ? "Rejected ": Salon.status==="pending"? "Accept or Reject" : "block"}
                      
                        
                       
                        
                    </button>

                    <Modal
                      isOpen={isRejectModalOpen}
                      onRequestClose={() => setRejectModalOpen(false)}
                      contentLabel="Reject  Salon"
                      className="bg-gray-800 p-4 rounded-lg text-white max-w-md mx-auto my-20"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
                      ariaHideApp={false} // Disable hiding the app
                    >
                      <h2 className="text-xl mb-4">Reject Salon</h2>
                      <p>
                        Are you sure you want to Reject the Salon "
                        {Salon?.userName}
                        "?
                      </p>
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => setRejectModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDeleteSalon(Salon?._id ?? "")}
                        >
                          Accept
                        </button>
                      </div>
                    </Modal>
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
