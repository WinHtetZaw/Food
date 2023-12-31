import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useGetSearchItemsQuery } from "../redux/services/mealApi";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { Button } from "@nextui-org/react";
import BackBtn from "../components/BackBtn";
import { setSearchWord } from "../redux/features/mealSlice";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchWord } = useSelector((state) => state.mealSlice);
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, status } =
    useGetSearchItemsQuery(searchWord);

  const searchLists = data?.meals;

  useEffect(() => {
    if (searchWord) {
      setSearchParams({ q: searchWord });
    }

    return () => {
      setSearchParams({});
    };
  }, []);

  const listsLooping = searchLists?.map((el, index) => {
    return (
      <div className=" w-fit h-fit" key={index}>
        <ItemCard {...el} />
      </div>
    );
  });

  return (
    <div className="relative">
      <div className="absolute left-5 top-5">
        <BackBtn />
      </div>
      {isLoading || status === "pending" ? (
        <div className="flex items-center justify-center height-1 w-full">
          <div className="w-[150px] md:w-[300px]">
            <Loading />
          </div>
        </div>
      ) : (
        <>
          {searchLists?.length > 0 ? (
            <div className="height-1 pt-20 pb-10">
              <div className="max-md:p-3 p-5">
                <h2 className="text-xl uppercase font-light">{searchWord}</h2>
                <div className=" w-full py-10 overflow-hidden flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
                  {isSuccess && listsLooping}
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-full height-1 flex items-center justify-center">
              <div className="flex items-center flex-col w-[200px]">
                {/* <EmptyWhitelist /> */}

                <h3>No match found</h3>
                <Link to={"/"}>
                  <Button className=" bg-orange rounded-sm text-white mt-3 shadow-2xl">
                    Go To Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
