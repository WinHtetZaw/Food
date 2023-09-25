import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import BackBtn from "../components/BackBtn";
import EmptyWhitelist from "../components/EmptyWhitelist";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

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
      {whitelists?.length > 0 ? (
        <div className="px-10 py-24 w-full overflow-hidden flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
          {listsLooping}
        </div>
      ) : (
        <div className=" w-full height-1 flex flex-col items-center justify-center">
          <div className="flex items-center flex-col w-[200px]">
            {/* <EmptyWhitelist /> */}

            <h3>No whitelist found</h3>
            <Link to={"/"}>
              <Button className=" bg-orange rounded-sm text-white mt-3 shadow-2xl">
                Add new
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Whitelist;
