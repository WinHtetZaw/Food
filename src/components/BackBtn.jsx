import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const { isDark } = useSelector((state) => state.mealSlice);
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`py-4 px-1 rounded active:scale-90 transition duration-200 ${isDark ? "bg-black" : "bg-white"}  bg-opacity-60 hover:bg-opacity-80`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
};

export default BackBtn;
