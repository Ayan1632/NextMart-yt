// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchAllProducts = createAsyncThunk(
//     "products/fetchAllProducts",
//     async () => {
//         const res = await axios.get(
//             "https://fakestoreapi.com/products"
//         );

//         return res.data;
//     }
// );

// const productSlice = createSlice({
//     name: "products",

//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//     },

//     reducers: {},

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllProducts.pending, (state) => {
//                 state.loading = true;
//             })

//             .addCase(fetchAllProducts.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })

//             .addCase(fetchAllProducts.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export default productSlice.reducer;