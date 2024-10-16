// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import styled from 'styled-components';

// // Fix Leaflet's icon problem
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// Styled components
// const AppContainer = styled.div`
//   padding: 20px;
//   font-family: Arial, sans-serif;
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: bold;
// `;

// const MapWrapper = styled.div`
//   height: 400px;
//   width: 100%;
//   margin-top: 20px;
// `;

// const NearestSalonInfo = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background-color: #f0f0f0;
//   border-radius: 4px;
// `;

// // Interfaces
// interface Salon {
//   _id: string;
//   name: string;
//   lat: number;
//   lon: number;
// }

// // Haversine distance calculation function
// function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
//   const R = 6371; // Earth's radius in kilometers
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c; // Distance in kilometers
// }

// const App: React.FC = () => {
//   const [salons, setSalons] = useState<Salon[]>([]);
//   const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
//   const [nearestSalon, setNearestSalon] = useState<Salon | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSalons();
//   }, []);

//   const fetchSalons = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get<Salon[]>('http://your-backend-url/api/salons');
//       setSalons(response.data);
//     } catch (err) {
//       setError('Error fetching salons');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc: [number, number] = [position.coords.latitude, position.coords.longitude];
//           setUserLocation(userLoc);
//           findNearestSalon(userLoc);
//         },
//         (error) => {
//           setError("Error getting user location: " + error.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   const findNearestSalon = (location: [number, number]) => {
//     if (salons.length === 0) return;

//     let nearest = salons[0];
//     let shortestDistance = haversineDistance(location[0], location[1], nearest.lat, nearest.lon);

//     for (const salon of salons) {
//       const distance = haversineDistance(location[0], location[1], salon.lat, salon.lon);
//       if (distance < shortestDistance) {
//         shortestDistance = distance;
//         nearest = salon;
//       }
//     }

//     setNearestSalon(nearest);
//   };

//   return (
//     <AppContainer>
//       <h1>Salon Finder</h1>
//       <Button onClick={getUserLocation} disabled={loading}>
//         {loading ? 'Loading...' : 'Find Nearest Salon'}
//       </Button>
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       {userLocation && (
//         <MapWrapper>
//           <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {salons.map((salon) => (
//               <Marker 
//                 key={salon._id} 
//                 position={[salon.lat, salon.lon]}
//                 icon={salon === nearestSalon ? new L.Icon({
//                   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//                   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//                   iconSize: [25, 41],
//                   iconAnchor: [12, 41],
//                   popupAnchor: [1, -34],
//                   shadowSize: [41, 41]
//                 }) : undefined}
//               >
//                 <Popup>{salon.name}</Popup>
//               </Marker>
//             ))}
//             <Marker position={userLocation}>
//               <Popup>Your Location</Popup>
//             </Marker>
//           </MapContainer>
//         </MapWrapper>
//       )}
//       {nearestSalon && (
//         <NearestSalonInfo>
//           <h2>Nearest Salon:</h2>
//           <p><strong>Name:</strong> {nearestSalon.name}</p>
//           <p><strong>Distance:</strong> {userLocation ? haversineDistance(userLocation[0], userLocation[1], nearestSalon.lat, nearestSalon.lon).toFixed(2) : 'N/A'} km</p>
//         </NearestSalonInfo>
//       )}
//     </AppContainer>
//   );
// };

// export default App;