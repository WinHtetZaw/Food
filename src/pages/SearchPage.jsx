import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useGetSearchItemsQuery } from "../redux/services/mealApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchWord } = useSelector((state) => state.mealSlice);

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
    <>
      {isLoading || status === "pending" ? (
        <div className="flex items-center justify-center height-1 w-full">
          <div className="w-[150px] md:w-[300px]">
            <Loading />
          </div>
        </div>
      ) : (
        <div className=" sm:my-10">
          <div className="max-md:p-3 p-5">
            <h2 className="text-xl uppercase font-light">
              {searchWord}
            </h2>
            <div className=" w-full py-10 overflow-hidden flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
              {isSuccess && listsLooping}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
