// src/features/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Импортируем библиотеку Axios

const API_URL = "http://localhost:8007";

export const addItemAsync = createAsyncThunk(
  "cart/addItemAsync",
  async (item) => {
    try {
      const response = await axios.post(`${API_URL}/cart`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Пробрасываем ошибку дальше для обработки
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  "cart/removeItemAsync",
  async (id) => {
    await axios.delete(`${API_URL}/cart/${id}`);
    window.location.reload();
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async () => {
    await axios.delete(`${API_URL}/cart`);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Добавьте синхронные действия, если необходимо
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(removeItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
