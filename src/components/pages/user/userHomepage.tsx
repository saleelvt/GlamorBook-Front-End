import { useSelector } from "react-redux";
import UserNavbar from "../../Navbar/userNavbar";
import { RootState } from "../../../reduxKit/store";
import ImageCarousel from "../../carousels/salonCarousels";
import SalonFooter from "../../footer/salonFooter";

function UserHomepage() {
  const { role } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <UserNavbar />
      <ImageCarousel />
      <p>this is the home page of the {role}</p>
      <SalonFooter />
    </div>
  );
}

export default UserHomepage;
