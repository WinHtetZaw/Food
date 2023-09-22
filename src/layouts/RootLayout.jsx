import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";

const RootLayout = () => {
  return (
    <div className=" text-[#333] bg-white bg-opacity-10 backdrop-blur-lg">

      <Navbar/>
      <div className="height-1">
        <Outlet />
      </div>
      <Foot/>
    </div>
  );
};

export default RootLayout;
