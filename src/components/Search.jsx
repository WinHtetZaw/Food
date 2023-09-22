import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSearchWord } from "../redux/features/mealSlice";
// import "../css/inputSearch.css"

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      dispatch(setSearchWord(''));
      return;
    }
    dispatch(setSearchWord(search));
  };

  return (
    <>
      {/* <form
        className={` max-sm:hidden px-5 py-2 w-[230px] bg-glass-1 rounded-full flex  ${
          isFocused && "ring-2"
        } ring-inset ring-orange-500 transition-all duration-[3s] flex items-center justify-center`}
      > */}
       <form
        className={` w-[180px] sm:w-[230px] py-1 border-b-2 border-black border-opacity-40 flex items-center justify-center`}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            // setIsActive(false);
          }}
          ref={inputRef}
          className="outline-none w-full bg-transparent"
          type="text"
          placeholder="Search..."
        />

        {search.length > 0 && (
          <>
            <div
              onClick={() => {
                setSearch("");
                inputRef.current.focus();
              }}
              className=" opacity-70 pr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </>
        )}
        <button
          onClick={handleSearchSubmit}
          className=" border-l-2 pl-2 border-black border-opacity-40"
        >
          <BsSearch className="hover:scale-110 active:scale-90" />
        </button>
      </form>

      {/* <div className="search-box">
        <button className="btn-search">
          <BsSearch className="search-icon mx-auto" />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Search..."
        />
      </div> */}
    </>
  );
};

export default Search;
