


import { useSelector } from "react-redux"
import AdminNavbar from "../../Navbar/adminNavbar"
import { RootState } from "../../../reduxKit/store"
import { Button } from "@nextui-org/react"




function AdminHomePage() {

  const {role} =useSelector((state:RootState)=>state.auth)

  return (
    <div>    
      <AdminNavbar/>  

      <h1>this is page and role is {role}</h1>
            <div className="bg-gray-500 ml-10 mt-12 w-36 h-96 rounded-md flex justify-center  ">

              <Button className=" rounded bg-black mt-12 text-white"> Salon List </Button>
              {/* <Button className=" rounded bg-black mt-12 text-white"> Use List </Button> */}



            </div>
    </div>
  )
}

export default AdminHomePage
