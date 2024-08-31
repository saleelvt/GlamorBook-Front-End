import SalonNavbar from "../../Navbar/salonNavbar";
import ImageCarousel from "../../carousels/salonCarousels";
import SalonFooter from "../../footer/salonFooter";
import SalonHeader from "../../header/salonHeader"

function SalonHomePage() {
  return (
    <div>
      <SalonNavbar />
      <ImageCarousel />
      <SalonHeader />
      <SalonFooter />
    </div>
  );
}

export default SalonHomePage;
