import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import BackBtn from "../components/BackBtn";

const Whitelist = () => {
  const { whitelists } = useSelector((state) => state.mealSlice);

  const listsLooping = whitelists?.map((el, index) => {
    return (
      <div className=" w-fit h-fit " key={index}>
        <ItemCard {...el} />
      </div>
    );
  });
  return (
    <div className="relative">
      <div className="absolute left-5 mt-5">
        <BackBtn />
      </div>
      <div className="px-10 py-24 flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
        {listsLooping}
      </div>
    </div>
  );
};

export default Whitelist;
