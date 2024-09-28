import UserNavbar from "../../Navbar/userNavbar";
import UserCarousel from "../../carousels/userCarousels";
import WelcomeHeader from "../../header/salonHeader";
import Footer from "../../footer/salonFooter";

function UserWelcomePage() {
  return (
    <div>
      <UserNavbar />
      <UserCarousel />
      <WelcomeHeader />
      <Footer />

    </div>
  );
}

export default UserWelcomePage;
