/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import UserNavbar from "../../Navbar/userNavbar";
import { RootState } from "../../../reduxKit/store";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Loading } from "../Loading";
import { FaPhoneAlt } from "react-icons/fa";
import ImageCarousel from "../../carousels/salonCarousels";
import SalonFooter from "../../footer/salonFooter";
import { useEffect, useState } from "react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useUserLocation } from "./useUserLocation";
import { useNavigate } from "react-router-dom";
import salonProifleImage from "../../../assets/images/marker.png";
import "../../../CSS/mapCss.css";
import { HaversineDistance } from "../../mapComponent/haversineDistance";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
const customIcon = new L.Icon({
  iconUrl: `${salonProifleImage}`, // Dynamic salon profile image URL
  iconSize: [30, 40], // Adjust the icon size to a smaller, rounded profile
  iconAnchor: [20, 40], // Adjust anchor point for better positioning
  popupAnchor: [0, -40], // Position of the popup relative to the icon
  shadowSize: [50, 64], // Size of the shadow (optional)
  className: "custom-icon", // CSS class for additional styling
});
const AppContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;
const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  margin-top: 20px;
`;

const NearestSalonInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

function UserHomepage() {
  const { role } = useSelector((state: RootState) => state.auth);
  const [salons, setSalons] = useState<SalonInterface[]>([]);
  const [NearestSalon, setNearestSalon] = useState<SalonInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useUserLocation(setLoading);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "it fro the saln logfin ",
      role,
      " This is the current user latitude and longitude  ",
      location
    );

    const fetchAllSalons = async () => {
      try {
        const response = await commonRequest("GET", "/getAllSalon", config);
        setSalons(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllSalons();
  }, []);

  const userLatitude: number = location ? location.lat : 0;
  const userLongitude: number = location ? location.lng : 0;
  const userLocations: [number, number] = [userLatitude, userLongitude];
  console.log("this is the all salons ===========  ", salons);
  console.log("this is the all userLocations ===========  ", userLocations);

  const findNearestSalon = (location: [number | null, number | null]) => {
    setLoading(true);

    if (salons?.length === 0) {
      setError("the salon is null or undifined ");

      return;
    }
    let nearest = salons[0];

    console.log(
      "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn,",
      location,
      "777777777777777777",
      nearest.latitude,
      nearest.longitude
    );
    let shortestDistence = HaversineDistance(
      userLocations[0],
      userLocations[1],
      nearest.latitude ? nearest.latitude : 0,
      nearest.longitude ? nearest.longitude : 0
    );

    for (const salon of salons) {
      const distence = HaversineDistance(
        userLocations[0],
        userLocations[1],
        salon.latitude ? salon.latitude : 0,
        salon.longitude ? salon.longitude : 0
      );

      if (distence < shortestDistence) {
        shortestDistence = distence;
        nearest = salon;
      }
    }
    setNearestSalon(nearest);
    setLoading(false);
  };
  if (loading) return <Loading />;
  return (
    <div>
      <UserNavbar />
      <ImageCarousel />
      <header className="welcome-header mt-12 bg-gradient-to-b from-gray-100 via-gray-100 via-gray-200   to-green-900">
        <h1 className="text-2xl text-black">Welcome to GlamorBook!</h1>
        <p className="text-black">
          Your Salon's new Home for easy service management and booking..
        </p>

        <AppContainer>
          <Button
            onClick={() => {
              findNearestSalon(userLocations);
            }}
            disabled={loading}
            // radius="full"
            className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg  mt-12 rounded-md"
          >
            {loading ? "Loading..." : "Find Nearest Salon"}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {userLocations && (
            <MapWrapper>
              <MapContainer
                center={userLocations}
                zoom={15}
                style={{
                  height: "100%",
                  width: "70%",
                  marginLeft: "15%",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {salons.map((salon) => (
                  <Marker
                    key={salon._id}
                    position={[
                      salon.latitude ? salon.latitude : 0,
                      salon.longitude ? salon.longitude : 0,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div>
                        <strong>{salon.salonName}</strong>
                        <br />
                        <button
                          onClick={() => navigate(`/salonDetails/${salon._id}`)} // Navigate to the salon details page
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "5px",
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <Marker position={userLocations}>
                  <Popup>Your Location</Popup>
                </Marker>
              </MapContainer>
            </MapWrapper>
          )}
          {NearestSalon && (
            <NearestSalonInfo>
              <h2 className="text-black font-semibold"></h2>
              <p className="text-black font-semibold">
                Nearest Salon Name:{NearestSalon.salonName}
              </p>
              <p className="text-black font-semibold">
                <strong>Distance:</strong>{" "}
                {userLocations
                  ? HaversineDistance(
                      userLocations[0],
                      userLocations[1],
                      NearestSalon.latitude ? NearestSalon.latitude : 0,
                      NearestSalon.longitude ? NearestSalon.longitude : 0
                    ).toFixed(2)
                  : "N/A"}{" "}
                km
              </p>
              <button
                          onClick={() => navigate(`/salonDetails/${NearestSalon._id}`)} // Navigate to the salon details page
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "5px",
                          }}
                        >
                          View Details
                        </button>
            </NearestSalonInfo>
          )}
        </AppContainer>
      </header>
      <h1 className="text-2xl  font-bold  font-mono mt-8 lg:ml-28">For you</h1>
      <div className="  mt-4     bg-slate-200  flex justify-center ">
        {salons?.map((Salon, index) => (
          <div
            key={index}
            className="relative  ml-4 flex shadow-lg flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80"
          >
            <div className="relative  p-2 sh h-72 overflow-hidden rounded-lg bg-clip-border">
              <img
                onClick={() => navigate(`/salonDetails/${Salon._id}`)}
                src={Salon.profilePicture!}
                alt="card-image"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-slate-800 text-xl font-semibold">
                  {Salon.salonName}
                </p>
                <p className="text-4xl font-semibold">
                  <BiMessageRoundedDetail />
                </p>
              </div>
              <p className="text-slate-600 leading-normal font-light">
                {`${Salon.city},${Salon.state}`}
              </p>
              <div className="flex items-center ">
                <FaPhoneAlt className="text-slate-600 mr-2" />
                <p className="text-slate-600 leading-normal font-bold">
                  {`: ${Salon.phone}`}
                </p>
              </div>

              <div className="felx justify-center  ">
                <button
                  className="rounded-md mt-6 bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <span className="flex items-center">
                    Get
                    <FaMapMarkerAlt size={20} className="ml-2" />{" "}
                    {/* Map marker icon */}
                  </span>
                </button>
                <button
                  className="rounded-md  ml-16 bg-gradient-to-b from-green-500 via-green-700 to-green-900 py-2 px-4 border  text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Book Your Slote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SalonFooter />
    </div>
  );
}

export default UserHomepage;
