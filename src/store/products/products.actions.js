import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLastPage } from "./products.slice";
// import { getUsers } from "../users/users.actions";

const PRODUCTS_API = "http://localhost:8007/products";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    axios.post(PRODUCTS_API, product);
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (search = "", { getState, dispatch }) => {
    const { currentPage } = getState().products;
    const { data, headers } = await axios.get(
      `${PRODUCTS_API}?_page=${currentPage}&_limit=3&q=${search}`
    );
    const totalCount = Math.ceil(headers["x-total-count"] / 3);
    console.log(totalCount);
    currentPage === totalCount
      ? dispatch(setLastPage(true))
      : dispatch(setLastPage(false));
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch }) => {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    dispatch(getProducts());
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (id) => {
    const { data } = await axios.get(`${PRODUCTS_API}/${id}`);
    return data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, product }, { dispatch }) => {
    await axios.patch(`${PRODUCTS_API}/${id}`, product);
    dispatch(getProducts());
  }
);
