import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { isDark } = useSelector((state) => state.mealSlice);
  return (
    <div
      className={`${
        isDark
          ? "text-[#ccc] bg-black bg-opacity-60 backdrop-blur-sm"
          : "text-[#333] bg-white bg-opacity-10 backdrop-blur-lg"
      } transition-all duration-100`}
    >
      <Navbar />
      <div className="height-1">
        <Outlet />
      </div>
      <Foot />
    </div>
  );
};

export default RootLayout;
