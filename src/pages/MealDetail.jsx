import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMealDetailQuery } from "../redux/services/mealApi";
import { FaArrowRightLong } from "react-icons/fa6";
import { filterProperties } from "../shared/help";
import { HiOutlineExternalLink } from "react-icons/hi";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";

const MealDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, status } = useGetMealDetailQuery(id);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const navigate = useNavigate();

  const meal = data?.meals[0];
  // isSuccess && console.log(meal);

  useEffect(() => {
    if (isSuccess) {
      const filterObj = filterProperties(meal, (key, value) =>
        key.includes("strIngredient")
      );
      const arr = Object.values(filterObj).filter((el) => el !== "");
      setIngredients(arr);
    }

    if (isSuccess) {
      const filterObj = filterProperties(meal, (key, value) =>
        key.includes("strMeasure")
      );
      const arr = Object.values(filterObj).filter((el) => el !== "");
      setMeasures(arr);
    }
  }, [isSuccess, meal]);

  return (
    <div
      // style={{
      //   backgroundImage: `url(https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600`,
      // }}
      // bg-no-repeat bg-cover bg-center
      // className={`height-1 relative  w-full bg-fixed bg-no-repeat bg-cover bg-center`}
      className={`height-1 relative`}
    >
      <div className="p-5 height-1 ">
        <div className="">
          <BackBtn />
        </div>
        {isLoading || !isSuccess ? (
          <div className="mt-20 flex items-center justify-center w-full">
            <div className="w-[150px] md:w-[300px]">
              <Loading />
            </div>
          </div>
        ) : (
          <>
            <div className="flex mt-[30px] max-md:flex-col gap-y-5 md:items-center w-full  mb-10">
              <div className="flex justify-center w-full md:w-1/2">
                <img
                  className="rounded"
                  width={300}
                  height={300}
                  src={meal?.strMealThumb}
                />
              </div>

              <div className="flex flex-col gap-2 md:w-1/2">
                {/* title  */}
                <div className="whitespace-nowrap flex items-center gap-2">
                  <h3 className="title">{meal?.strMeal}</h3>
                  <a
                    href={meal?.strSource}
                    className=" cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HiOutlineExternalLink />
                  </a>
                </div>

                {/* genre  */}
                <div className="flex items-center gap-2 md:gap-5">
                  <p>{meal?.strArea} /</p>
                  <p>{meal?.strCategory}</p>
                  <a
                    href={meal?.strYoutube}
                    className=" cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img width={30} src="/youtube.png" alt="youtube" />
                  </a>
                </div>
              </div>
            </div>

            {/* how to */}
            <div className="">
              <div className="para-container">
                <h2 className="title text-center">how to</h2>
                <FaArrowRightLong className="mt-[4px]" />
              </div>
              <p>{meal?.strInstructions}</p>
            </div>

            {/* ingredient table  */}
            <div className="flex gap-x-3 my-10 max-md:w-[95%] w-[80%] mx-auto justify-between">
              <div className="">
                <h3 className=" title mb-5 font-bold">ingredients</h3>
                <ul className="flex flex-col gap-1">
                  {ingredients?.map((el, index) => (
                    <li className="" key={index}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h3 className="title mb-5 font-bold">measures</h3>
                <ul className="flex flex-col gap-1">
                  {measures?.map((el, index) => (
                    <li className="" key={index}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MealDetail;
