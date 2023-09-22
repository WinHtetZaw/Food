import { useSelector } from "react-redux";
import {
  useGetCategoriesFilterByAreaQuery,
  useGetCategoriesFilterByFoodQuery,
  useGetSearchItemsQuery,
} from "../redux/services/mealApi";
import ItemCard from "../components/ItemCard";
import { randomNum } from "../shared/help";
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

  const { searchWord } = useSelector((state) => state.mealSlice);

  const {
    data: dataSearch,
    isLoading: isLoadingSearch,
    isSuccess: isSuccessSearch,
    status: statusSearch,
  } = useGetSearchItemsQuery(searchWord);

  const foodCategories = data?.meals;
  const foodCategoriesByArea = dataArea?.meals;
  const searchLists = dataSearch?.meals;
  // const foodCategories =  data?.meals

  (searchLists?.length > 0 &&
    searchWord.length > 0 &&
    statusSearch !== "pending") > 0 && console.log(searchLists);

  useEffect(() => {
    if (
      searchLists?.length > 0 &&
      searchWord.length > 0 &&
      statusSearch !== "pending"
    ) {
      setLists(searchLists);
    } else {
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
    }
  }, [foodCategories, foodCategoriesByArea, selectedKind, searchLists]);

  const listsLooping = lists?.map((el, index) => {
    // const randomNumber = randomNum(1, 5);
    // const randomHandOnTime = randomNum(10, 40);
    // const randomTotalTime = randomNum(10, 20) + randomHandOnTime;
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
      isLoadingSearch ||
      statusSearch === "pending" ||
      status === "pending" ||
      statusArea === "pending" ? (
        <div className="flex items-center justify-center height-1 w-full">
          <div className="w-[150px] md:w-[300px]">
            <Loading />
          </div>
        </div>
      ) : (
        <div className=" sm:my-10">
          <div className="max-md:p-5 p-5">
            <h2 className="text-xl uppercase font-light mb-5 sm:mb-10">
              {searchWord.length > 0 ? searchWord :  selectedFoodCategory}
            </h2>
            {/* {isSuccess && <ItemCard lists={foodCategories[0]} />} */}
            <div className=" flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-y-20">
              {(isSuccess || isSuccessArea) && listsLooping}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
