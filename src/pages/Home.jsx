import { useSelector } from "react-redux";
import {
  useGetCategoriesFilterByAreaQuery,
  useGetCategoriesFilterByFoodQuery,
} from "../redux/services/mealApi";
import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [lists, setLists] = useState([]);
  const { selectedFoodCategory, selectedKind } = useSelector(
    (state) => state.mealSlice
  );
  const { data, isLoading, isSuccess, status } =
    useGetCategoriesFilterByFoodQuery(selectedFoodCategory);

  const {
    data: dataArea,
    isLoading: isLoadingArea,
    isSuccess: isSuccessArea,
    status: statusArea,
  } = useGetCategoriesFilterByAreaQuery(selectedFoodCategory);

  const foodCategories = data?.meals;
  const foodCategoriesByArea = dataArea?.meals;

  useEffect(() => {
    // if (
    //   searchLists?.length > 0 &&
    //   searchWord.length > 0 &&
    //   statusSearch !== "pending"
    // ) {
    //   setLists(searchLists);
    // } else {
    // }
    switch (selectedKind) {
      case "c":
        {
          setLists(foodCategories);
        }
        break;

      case "a":
        {
          setLists(foodCategoriesByArea);
        }
        break;
    }
  }, [foodCategories, foodCategoriesByArea, selectedKind]);

  const listsLooping = lists?.map((el, index) => {
    return (
      <div className=" w-fit h-fit" key={index}>
        <ItemCard {...el} />
      </div>
    );
  });

  return (
    <>
      {isLoading ||
      isLoadingArea ||
      status === "pending" ||
      statusArea === "pending" ? (
        <div className="flex items-center justify-center height-1 w-full">
          <div className="w-[150px] md:w-[300px]">
            <Loading />
          </div>
        </div>
      ) : (
        <div className=" sm:my-10">
          <div className="max-md:p-3 p-5">
            <h2 className="text-xl uppercase font-light">
              {selectedFoodCategory}
            </h2>
            <div className=" w-full py-10 overflow-hidden flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
              {(isSuccess || isSuccessArea) && listsLooping}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
