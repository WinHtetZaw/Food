import { Switch } from "@nextui-org/react";
import React from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "../redux/features/mealSlice";

const Swiftbtn = () => {
  const { isDark } = useSelector((state) => state.mealSlice);
  const dispatch = useDispatch();
  return (
    <>
      <Switch
      
        isSelected={isDark ? true : false}
        onValueChange={(data) => dispatch(setIsDark(data))}
        className="text-orange"
        size="md"
        color="warning"
        startContent={<BsFillMoonFill />}
        endContent={<BsFillSunFill />}
      ></Switch>
    </>
  );
};

export default Swiftbtn;
