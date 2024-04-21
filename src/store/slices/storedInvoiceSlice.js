import { createSlice } from "@reduxjs/toolkit";

const storedInvoiceSlice = createSlice({
  name: "storedInvoiceSlice",
  initialState: {
    data: [],
    error: null,
    loading: "idle",
    refresh: false,
  },
  reducers: {
    storeInvoice: (state, action) => {
      state.data.push(action.payload);
    },
    deleteStoredInvoice: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { storeInvoice, deleteStoredInvoice } = storedInvoiceSlice.actions;

export default storedInvoiceSlice;
