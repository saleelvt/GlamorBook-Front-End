

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




//   useEffect(() => {
 
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

// }, []);

  
  
  


  
  
  //Handling Acceptance of the Theater 
  const handleAccept = async () => {
    if (theater) {
      try {
        const response = await commonRequest("PATCH",`/admin/${theater._id}/accept-theater`,
           config,
          {
            status: "active",
          }
        );

        console.log(response, "Accept response");

        setTheater({ ...theater, status: "active" });
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
    if (theater) {
      try {
        const response = await commonRequest(
          "PATCH",
          `/admin/${theater._id}/accept-theater`,
          config,
          {
            status: "rejected",
            comments: rejectReason,
          }
        );

        console.log(response, "Reject response");

        setTheater({ ...theater, status: "rejected", comments: rejectReason });

        setRejectModalOpen(false);

        toast.success("Rejection email sent successfully");

        setTimeout(() => {
          navigate(-1); // Navigate to the previous page
        }, 2000);

      } catch (error:any) {
        console.error("Failed to Reject the theater:", error);
        toast.error("Failed to Reject the theater");
      }
    }
  };















  if (!theater) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 min-h-screen flex justify-center items-center">
      <Toaster /> {/* Add Toaster component */}
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl mb-4">Salon Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Image
                src={theater.profilePicture || ""}
                alt="Profile"
                className="cursor-pointer"
                onClick={() => setProfilePictureOpen(true)}
              />
              <Modal
                isOpen={isProfilePictureOpen}
                onClose={() => setProfilePictureOpen(false)}
              >


                <ModalContent>
                  <ModalBody>
                    <Image
                      src={theater.profilePicture || ""}
                      alt="Profile"
                      className="w-full h-auto"
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>









            <div className="col-span-1">
              <Image
                src={theater.aadhaarCard || ""}
                alt="Aadhaar Card"
                className="cursor-pointer"
                onClick={() => setAadhaarCardOpen(true)}
              />
              <Modal
                isOpen={isAadhaarCardOpen}
                onClose={() => setAadhaarCardOpen(false)}
              >
                <ModalContent>
                  <ModalBody>
                    <Image
                      src={theater.aadhaarCard || ""}
                      alt="Aadhaar Card"
                      className="w-full h-auto"
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>





            
            <div className="col-span-1">
              <Image
                src={theater.licenseDocument || ""}
                alt="License Document"
                className="cursor-pointer"
                onClick={() => setLicenseDocumentOpen(true)}
              />
              <Modal
                isOpen={isLicenseDocumentOpen}
                onClose={() => setLicenseDocumentOpen(false)}
              >
                <ModalContent>
                  <ModalBody>
                    <Image
                      src={theater.licenseDocument || ""}
                      alt="License Document"
                      className="w-full h-auto"
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input readOnly label="Username" value={theater.username} />
            <Input readOnly label="Email" value={theater.email} />
            <Input
              readOnly
              label="Owner Name"
              value={theater.OwnerName || ""}
            />
            <Input readOnly label="Address" value={theater.address || ""} />
            <Input readOnly label="City" value={theater.city || ""} />
            <Input readOnly label="State" value={theater.state || ""} />
            <Input readOnly label="Zip Code" value={theater.zipCode || ""} />
            <Input readOnly label="Phone" value={theater.phone || ""} />
            <Input readOnly label="Role" value={theater.role || ""} />
            <Input readOnly label="Status" value={theater.status || ""} />
            <Input readOnly label="Comments" value={theater.comments || ""} />
          </div>
          <div className="mt-4 flex gap-4">
            <Button onClick={() => setAcceptModalOpen(true)}>Accept</Button>
            <Button color="danger" onClick={() => setRejectModalOpen(true)}>
              Reject
            </Button>
          </div>
        </div>
      </Card>
      {/* Accept Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Acceptance</ModalHeader>
          <ModalBody>Are you sure you want to accept the theater?</ModalBody>
          <ModalFooter>
            <Button onClick={handleAccept}>Yes</Button>
            <Button color="danger" onClick={() => setAcceptModalOpen(false)}>
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
        <ModalContent>
          <ModalHeader>Reason for Rejection</ModalHeader>
          <ModalBody>
            <Input
              label="Reason"
              placeholder="Write the reason for rejection..."
              fullWidth
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleReject}>Submit</Button>
            <Button color="danger" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SalonDetailsPage;
