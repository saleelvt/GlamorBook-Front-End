// import { useSelector } from "react-redux";
import UserNavbar from "../../Navbar/userNavbar";
// import { RootState } from "../../../reduxKit/store";
// import myimage from "../../../assets/images/15ae9124-5e52-4ec8-b26e-f4839fbacf18(1).jpg";
import myimage3 from "../../../assets/images/5453a833-f9da-4a36-a51c-1c418f3d733d-ThePodiumSalonBarberCo-SG-Singapore-Singapore-Rochor-Fresha.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import ImageCarousel from "../../carousels/salonCarousels";
import SalonFooter from "../../footer/salonFooter";

function UserHomepage() {
  // const { role } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      

      <UserNavbar />
      <ImageCarousel />
      {/* <div className="w-full h-96 mt-12   bg-slate-200 flex justify-center ">

        <div className="w-2/3 rounded-lg  h-full ">
        <img className="w-full h-full rounded-lg shadow-2xl" src={myimage} alt="" /></div>
      </div> */}
      {/* <p>this is the home page of the {role}</p> */}

      <h1 className="text-2xl  font-bold  font-mono mt-8 lg:ml-28">For you</h1>
      <div className="  mt-4     bg-slate-200  flex justify-center ">
        <div className="relative  ml-4 flex shadow-lg flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80">
          <div className="relative  p-2 sh h-72 overflow-hidden rounded-lg bg-clip-border">
            <img
              src={myimage3}
              alt="card-image"
              className="h-full w-full object-cover rounded-md"
            />
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-slate-800 text-xl font-semibold">
                Apple AirPods
              </p>
              <p className="text-cyan-600 text-xl font-semibold">$95.00</p>
            </div>
            <p className="text-slate-600 leading-normal font-light">
              With plenty of talk and listen time, voice-activated Siri access,
              and an available wireless charging case.
            </p>
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
       
      </div>

      <SalonFooter />
    </div>
  );
}

export default UserHomepage;
