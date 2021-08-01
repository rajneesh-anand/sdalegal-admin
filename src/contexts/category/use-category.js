import React, { useReducer, useContext, createContext, useMemo } from "react";
import { reducer } from "./category-reducer";
export const categoryContext = createContext();

const initialState = {
  categories: [],
};

const useCategoryActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCategories = async () => {
    const result = await fetch("/api/categories");
    const res = await result.json();
    console.log(res);
    if (res.msg === "success") {
      dispatch({ type: "FETCH_CATEGORY", payload: res.data });
    }
  };

  return {
    state,
    fetchCategories,
  };
};

export const CategoryProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { state, fetchCategories } = useCategoryActions();
  return (
    <categoryContext.Provider
      value={{
        state,
        categories: state.categories,
        totalNumberOfrecords: state.categories.length,
        fetchCategories: fetchCategories,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};

export const useCategory = () => useContext(categoryContext);
