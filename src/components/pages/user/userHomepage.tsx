import { useSelector } from "react-redux";
import UserNavbar from "../../Navbar/userNavbar";
import { RootState } from "../../../reduxKit/store";

function UserHomepage() {
  const { role } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <UserNavbar />
      <p>this is the home page of the {role}</p>
    </div>
  );
}

export default UserHomepage;
