import { createSlice } from "@reduxjs/toolkit";

const createdInvoiceSlice = createSlice({
  name: "createdInvoice",
  initialState: {
    data: [],
    error: null,
    loading: "idle",
    refresh: false,
  },
  reducers: {
    saveInvoice: (state, action) => {
      state.data.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { saveInvoice, deleteInvoice } = createdInvoiceSlice.actions;

export default createdInvoiceSlice;
