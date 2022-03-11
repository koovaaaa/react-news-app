import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  topArticles: [],
  filteredArticles: [],
  loading: false,
  error: "",
};

export const getTopArticles = createAsyncThunk(
  "articles/getArticles",
  async ({ count }) => {
    return await api(
      "get",
      `/v2/top-headlines?country=us&category=business&pageSize=${count}`
    );
  }
);

export const getFilteredArticles = createAsyncThunk(
  "articles/getFiltered",
  async ({ searchTerm, count, order }) => {
    return await api(
      "get",
      `/v2/everything?q=${searchTerm}&sortBy=${order}&pageSize=${count}`
    );
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  extraReducers: {
    [getTopArticles.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [getTopArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.topArticles = action.payload;
      state.error = "";
      return state;
    },
    [getTopArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Error!";
      return state;
    },
    [getFilteredArticles.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [getFilteredArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.filteredArticles = action.payload;
      state.error = "";
      return state;
    },
    [getFilteredArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Error!";
    },
  },
});
