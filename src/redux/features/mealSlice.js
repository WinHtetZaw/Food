import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../shared/help";

const initialState = {
  selectedFoodCategory: "SeaFood",
  selectedKind: "c",
  searchWord: "",
  whitelists: [],
};

let lists;
if (getLocalStorage("whitelists")) {
  initialState.whitelists = getLocalStorage("whitelists");
}

export const mealSlice = createSlice({
  name: "mealSlice",
  initialState,
  reducers: {
    setSelectedFoodCategory: (state, { payload }) => {
      state.selectedFoodCategory = payload;
    },
    setSelectedKind: (state, { payload }) => {
      state.selectedKind = payload;
    },
    setWhitelists: (state, { payload }) => {
      const findId = state.whitelists.find(
        (el) => el.idMeal === payload.idMeal
      );
      if (!findId) {
        state.whitelists = [...state.whitelists, payload];
      }

      setLocalStorage("whitelists", state.whitelists);
    },
    removeWhitelists: (state, { payload }) => {
      const items = state.whitelists.filter(
        (el) => el.idMeal !== payload.idMeal
      );
      state.whitelists = items;
      setLocalStorage("whitelists", state.whitelists);
    },
    setSearchWord: (state, { payload }) => {
      // if (payload.length === 0) return;
      state.searchWord = payload;
    },
  },
});

export const {
  setSelectedFoodCategory,
  setSelectedKind,
  setWhitelists,
  removeWhitelists,
  setSearchWord
} = mealSlice.actions;

export default mealSlice.reducer;
