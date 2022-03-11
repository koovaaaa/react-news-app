import { combineReducers } from "@reduxjs/toolkit";
import { articlesSlice } from "./articlesReducer";

export const rootReducer = combineReducers({ articles: articlesSlice.reducer });
