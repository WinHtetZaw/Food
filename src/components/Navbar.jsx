import { Link, useLocation } from "react-router-dom";
import {
  useGetCategoryListsQuery,
  useGetCountryCategoriesQuery,
} from "../redux/services/mealApi";
import MenuItemModal from "./MenuItemModal";
import { useEffect, useState } from "react";
import Search from "./Search";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import Swiftbtn from "./Swiftbtn";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { data, isLoading } = useGetCategoryListsQuery();
  const { isDark } = useSelector((state) => state.mealSlice);
  const { data: countryData, isLoading: isLoadingCountry } =
    useGetCountryCategoriesQuery();

  const foodCategories = data?.meals;
  const countryCategories = countryData?.meals;

  const location = useLocation();

  const locationKey = location.key;
  // console.log(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationKey]);
  // bg-[#e7eded]
  return (
    <>
      <nav
        // style={{ background: "linear-gradient(135deg, #FFA500, #FF6347)", }}
        className={`sticky z-50 ${
          isDark
            ? "bg-black bg-opacity-50 backdrop-blur-sm"
            : "text-black bg-glass-1"
        }  top-0 px-3 h-[80px]`}
      >
        <div className="flex justify-between items-center w-full h-full">
          <Link to={"/"}>
            <h3 className="main-logo">FOODIE</h3>
          </Link>

          <div className=" max-sm:hidden">
            <Search />
          </div>

          {/* menu  */}
          <ul className="menu-container">
            <li className="menu-link">
              <MenuItemModal
                text={"meal"}
                isLoading={isLoading}
                categories={foodCategories}
              />
            </li>
            <li className="menu-link">
              <MenuItemModal
                text={"country"}
                isLoading={isLoadingCountry}
                categories={countryCategories}
              />
            </li>
            <Link to={"/whitelist"} className="max-sm:hidden">
              <li className="menu-link">whitelist</li>
            </Link>
          </ul>

          <Swiftbtn />

          <div
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className={`sm:hidden p-3 ${
              isDark ? "bg-slate-800" : "bg-slate-300"
            }  rounded-full`}
          >
            <HiOutlineMenuAlt3
              className={`${isDark ? "text-white" : "text-black"}`}
            />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpened && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{ scaleY: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            style={{ transformOrigin: "top" }}
            className={`sticky z-40 top-[80px] flex items-center justify-between sm:hidden w-full h-[50px] ${
              isDark ? "bg-black bg-opacity-40 backdrop-blur-sm" : "bg-glass-2"
            }  px-3`}
          >
            <Search />
            <Link to={"/whitelist"}>
              <div className="menu-link">whitelist</div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
