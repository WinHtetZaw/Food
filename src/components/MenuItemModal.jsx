import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedFoodCategory,
  setSelectedKind,
} from "../redux/features/mealSlice";
import { scrollToTop } from "../shared/help";

const MenuItemModal = ({ categories, isLoading, text }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      setIsHover(false);
    }
  }, []);

  const handleLinkClick = (el) => {
    if (el.strCategory) {
      dispatch(setSelectedFoodCategory(el.strCategory));
      dispatch(setSelectedKind("c"));
    }
    if (el.strArea) {
      dispatch(setSelectedFoodCategory(el.strArea));
      dispatch(setSelectedKind("a"));
    }
    if (el.strIngredient) {
      dispatch(setSelectedFoodCategory(el.strIngredient));
      dispatch(setSelectedKind("i"));
    }
    scrollToTop();
  };

  return (
    <>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex items-center justify-center h-[40px] relative"
      >
        <button disabled={isLoading && true} className="menu-link">
          {text}
        </button>
        {isHover && (
          <div className="absolute shadow-sm-1 z-40 top-[38px] -right-5 md:right-0 p-2 w-[200px] bg-glass-1 rounded-lg //  ">
            <ul className="flex flex-col max-h-[60vh] modal-scroll overflow-auto p-2">
              {categories?.map((el, index) => (
                <li
                  onClick={() => handleLinkClick(el)}
                  key={index}
                  className=" select-none cursor-pointer px-3 py-1 rounded-md text-sm hover:bg-slate-700 hover:text-white transition duration-150"
                >
                  {el.strCategory ?? el.strArea ?? el.strIngredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuItemModal;
