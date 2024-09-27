

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../Loading";

const SalonDetailsPage: React.FC = () => {
  const { salonId} = useParams<{ salonId: string }>();
  console.log('this sis my salon id ',salonId );


  const navigate = useNavigate();
  const [mySalon, setMySalon] = useState<SalonInterface | null>(null);
  const [isProfilePictureOpen, setProfilePictureOpen] = useState(false);
  const [isLicenseDocumentOpen, setLicenseDocumentOpen] = useState(false);
  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");




  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        console.log("-----------------------reeee");
        console.log("request going to admin side ");
        const response = await commonRequest(
          "GET",
          `/admin/getSalonDetails/${salonId}`,
          config
        );
        console.log(response, "response");
        setMySalon(response.data.data);
      } catch (error) {
        console.error("Failed to fetch theater details:", error);
      }
    };
    fetchSalonDetails();

}, []);

   console.log("dfkdjfk", mySalon);
   
  


  
  
  //Handling Acceptance of the Theater 
  const handleAccept = async () => {
    if (mySalon) {
      try {
        const response = await commonRequest("PATCH",`/admin/${mySalon._id}/acceptSalon`,
           config,
          { 
            status: "active",
          }
        );
        console.log(response, "Accept response");
        setMySalon({ ...mySalon, status: "active" });
        setAcceptModalOpen(false);

        // Show success toast and navigate to the previous page
        toast.success("Acceptance email sent successfully");
        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 2000); // Delay for 2 seconds to show the toast message
      } catch (error) {
        console.error("Failed to accept the theater:", error);
        toast.error("Failed to accept the theater");
      }
    }
  };




















  //Handling Rejection of Theater
  const handleReject = async () => {
    if (mySalon) {
      try {
        const response = await commonRequest(
          "PATCH",
          `/admin/${mySalon._id}/acceptSalon`,
          config,
          {
            status: "rejected",
            comments: rejectReason,
          }
        );

        console.log(response, "Reject response");

        setMySalon({ ...mySalon, status: "rejected", comments: rejectReason });

        setRejectModalOpen(false);

        toast.success("Rejection email sent successfully");

        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.error("Failed to Reject the theater:", error);
        toast.error("Failed to Reject the theater");
      }
    }
  };


  if (!mySalon) {
    return  <Loading/>
  }


  return (
    <div className="p-8  min-h-screen flex justify-center items-center">
      <Toaster /> {/* Add Toaster component */}
      <Card className="w-full max-w-4xl shadow-2xl border-[0.5px] border-emerald-950 rounded-xl  ">
        <div className="p-4">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-black border-b-4 border-black border-double  inline-block tracking-wide shadow-lg">
  Salon Details
</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Image
                src={mySalon.profilePicture || ""}
                alt="Profile"
                className="cursor-pointer"
                onClick={() => setProfilePictureOpen(true)}
              />
             <h4 className="text-xl font-bold  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black shadow-md">
  Profile Picture
</h4>
              <Modal
                isOpen={isProfilePictureOpen}
                onClose={() => setProfilePictureOpen(false)}
              >

                <ModalContent>
                  <ModalBody>
                    <Image
                      src={mySalon.profilePicture || ""}
                      alt="Profile"
                      className="w-full h-auto"
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>












            
            <div className="col-span-1bg-gradient-to-tr from-pink-300 to-yellow-200">
              <Image
                src={mySalon.licenseDocument || ""}
                alt="License Document"
                className="cursor-pointer"
                onClick={() => setLicenseDocumentOpen(true)}
              />
                               <h4 className="text-xl font-bold  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black shadow-md">
                               License Document
</h4>

              <Modal
                isOpen={isLicenseDocumentOpen}
                onClose={() => setLicenseDocumentOpen(false)}
              >

                <ModalContent>
                  <ModalBody>
                    <Image
                      src={mySalon.licenseDocument || ""}
                      alt="License Document"
                      className="w-full h-auto"
                    />
                    
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </div>
          

          <div className="grid  bg-gradient-to-r from-gray-100 to-gray-400 rounded-lg shadow-lg p-6 grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="grid bg-slate-100 rounded-lg shadow-lg p-6 grid-cols-1 md:grid-cols-2 gap-6 mt-12">
  <div>
    <label className="text-sm font-semibold text-gray-600">Username</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.userName}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Email</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.email}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Latitude</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{String(mySalon.latitude)}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Longitude</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{String(mySalon.longitude)}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">City</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.city || ""}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">State</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.state || ""}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Phone</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.phone || ""}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Role</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{mySalon.role || ""}</p>
  </div>
  <div>
    <label className="text-sm font-semibold text-gray-600">Status</label>
    <p className="mt-1 text-lg font-medium text-gray-900">{`${mySalon.status}...` || ""}</p>
  </div>
</div>


  <div className="md:col-span-2 flex justify-end gap-4 mt-6">
    <button disabled={mySalon.status==='active' || mySalon.status==='blocked'}
      className={`px-6 py-2 ${mySalon.status==='active' ? "bg-gray-500" : mySalon.status==="blocked" ? "bg-orange-500 cursor-not-allowed " : "bg-green-500" } text-white font-semibold rounded-lg shadow-sm `}
      onClick={() => setAcceptModalOpen(true)}
    >
      {mySalon.status==='active' ? "Already Active " :  mySalon.status==="blocked" ? "The Salon is Blocked" :"Accept"}
    </button>




{/* {mySalon.status==="rejected"} */}

   <button   disabled={mySalon.status==="rejected"}
      className={`px-6 py-2 ${mySalon.status==="rejected"? "bg-gray-500" : "bg-red-500 hover:bg-red-600"} text-white font-semibold rounded-lg shadow-sm   `}
     
      onClick={() => setRejectModalOpen(true)}
    >
      {mySalon.status==="rejected"? "Already Rejected" : "Reject"}
    </button>



  </div>
</div>

        </div>
      </Card>
      {/* Accept Modal */}



     {/* Accept Modal */}
<Modal
  isOpen={isAcceptModalOpen}
  onClose={() => setAcceptModalOpen(false)}
>
  


  <ModalContent className="top-10 mx-auto w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
    <ModalHeader className="text-xl font-bold text-gray-800">Confirm Acceptance</ModalHeader>
    <ModalBody className="text-gray-700 text-center mt-4">
      Are you sure you want to accept the Salon?
    </ModalBody>
    <ModalFooter className="flex justify-center gap-4 mt-6">
      <Button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
        onClick={handleAccept}
      >
        Yes
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
        onClick={() => setAcceptModalOpen(false)}
      >
        No
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>




{/* Reject Modal */}
<Modal
  isOpen={isRejectModalOpen}
  onClose={() => setRejectModalOpen(false)}
>
 
  <ModalContent className="top-10 mx-auto w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
    <ModalHeader className="text-xl font-bold text-gray-800">Reason for Rejection</ModalHeader>
    <ModalBody className="mt-4">
      <Input
        
        placeholder="Write the reason for rejection..."
        fullWidth
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-2"
      />
    </ModalBody>
    <ModalFooter className="flex justify-center gap-4 mt-6">
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
        onClick={handleReject}
      >
        Submit
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
        onClick={() => setRejectModalOpen(false)}
      >
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>



    </div>
  );
};

export default SalonDetailsPage;
