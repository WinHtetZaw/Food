import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  tagTypes: ["meals"],
  endpoints: (builder) => ({
    // getSeaFood: builder.query({
    //   query: () => `filter.php?c=Seafood`,
    //   providesTags: ["meals"],
    // }),
    getCategoryLists: builder.query({
      query: () => `list.php?c=list`,
      providesTags: ["meals"],
    }),
    getCountryCategories: builder.query({
      query: () => `list.php?a=list`,
      providesTags: ["meals"],
    }),
    getIngredientCategories: builder.query({
      query: () => `list.php?i=list`,
      providesTags: ["meals"],
    }),
    getCategoriesFilterByFood: builder.query({
      query: (foodName) => `filter.php?c=${foodName}`,
      providesTags: ["meals"],
    }),
    getCategoriesFilterByArea: builder.query({
      query: (areaName) => `filter.php?a=${areaName}`,
      providesTags: ["meals"],
    }),
    getMealDetail: builder.query({
      query: (id) => `lookup.php?i=${id}`,
      providesTags: ["meals"],
    }),
    getSearchItems: builder.query({
      query: (text) => `search.php?s=${text}`,
    }),
  }),
});
export const {
  useGetCategoryListsQuery,
  useGetCountryCategoriesQuery,
  useGetIngredientCategoriesQuery,
  useGetCategoriesFilterByFoodQuery,
  useGetCategoriesFilterByAreaQuery,
  useGetMealDetailQuery,
  useGetSearchItemsQuery,
} = mealApi;
