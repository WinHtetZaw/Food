import { Rating } from "@mantine/core";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeWhitelists, setWhitelists } from "../redux/features/mealSlice";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ItemCard = (props) => {
  const { idMeal, strMeal, strMealThumb } = props;
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { whitelists } = useSelector((state) => state.mealSlice);
  const { isDark } = useSelector((state) => state.mealSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const findId = whitelists?.find((el) => el.idMeal === props.idMeal);
    if (findId) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [whitelists]);

  const handleWhitelistAdd = () => {
    dispatch(setWhitelists(props));
    toast.success("Successfully Added");
  };

  const handleWhitelistRemove = () => {
    dispatch(removeWhitelists(props));
    toast.success("Successfully Removed");
  };

  return (
    <div className="relative aspect-[3/1] w-[300px] md:w-[500px]">
      <div
        data-aos="fade-down-right"
        // initial={{ translateX: "-100vw" }}
        // animate={{ translateX: 0 }}
        // transition={{ duration: 1 }}
        // exit={{ translateX: "-100vw" }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className=" flex shadow-b-1 rounded bg-glass-2"
      >
        {/* whitelist  */}
        <div className="absolute z-20 top-1 right-1 ">
          {isFavorite ? (
            <BsFillBookmarkCheckFill
              className="text-orange"
              onClick={handleWhitelistRemove}
            />
          ) : (
            <BsBookmark className="text-orange" onClick={handleWhitelistAdd} />
          )}
        </div>

        {/* left image  */}
        <div className=" w-1/3 aspect-square select-none overflow-hidden rounded">
          <img
            className={`${
              isHover ? "scale-125" : ""
            } transition-all ease-in duration-300 w-full h-full rounded `}
            src={strMealThumb}
            alt={strMeal}
          />
        </div>
        <div
          className={`px-2 py-5 md:p-5 w-2/3 ${
            isDark ? "bg-[#1a2238] opacity-90 backdrop-blur-lg" : ""
          } transition duration-100`}
        >
          {/* title  */}
          <h2
            className={`w-full truncate ml-[2px] ${!isDark && "text-purple"}`}
          >
            {strMeal}
          </h2>

          {/* rating  */}
          <div className="mt-2">
            <Rating size="sm" value={4} readOnly />
          </div>

          {/* take time  */}
          <div className="mt-[10px] max-md:hidden">
            <div className="flex w-full text-[14px]">
              <div className=" w-1/2 flex flex-col justify-center">
                <h4 className=" capitalize font-[300]">hands-on time</h4>
                <p className={`${!isDark && "text-purple"}`}>{27}min</p>
              </div>
              <div className=" w-1/2 flex flex-col justify-center">
                <h4 className=" capitalize font-[300]">total time</h4>
                <p className={`${!isDark && "text-purple"}`}>{44}min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Double-Click to View Detail! */}
      <div
        data-aos="fade-down-left"
        // initial={{ translateX: "100vw" }}
        // animate={{ translateX: 0 }}
        // transition={{ duration: 1 }}
        className="absolute p-0 -bottom-[20px] -right-[20px]"
      >
        <Tooltip closeDelay={0} showArrow={true} content="Please Double-Click">
          <Button
            onDoubleClick={() => navigate(`/meal/${idMeal}`)}
            className=" flex max-md:gap-1 gap-3 items-center justify-center max-md:w-[120px] max-md:h-[30px] w-[150px] h-[50px] bg-orange text-white shadow-b-2 rounded-sm"
          >
            <h6 className="uppercase max-md:text-[12px] text-[14px]">
              view recipe
            </h6>
            <FaArrowRightLong className="max-md:text-[12px]" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ItemCard;
