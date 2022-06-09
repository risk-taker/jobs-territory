const { createSlice } = require('@reduxjs/toolkit');

const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        addProducts(state, action) {
            state.push(action.payload);
        },
    },
});

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;