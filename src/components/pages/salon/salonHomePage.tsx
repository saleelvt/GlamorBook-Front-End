import SalonNavbar from "../../Navbar/salonNavbar";
import UserCarousel from "../../carousels/userCarousels";
import SalonFooter from "../../footer/salonFooter";
import SalonHeader from "../../header/salonHeader"

function SalonHomePage() {
  return (
    <div>
      <SalonNavbar />
      <UserCarousel />
      <SalonHeader />
      <SalonFooter />
    </div>
  );
}

export default SalonHomePage;
