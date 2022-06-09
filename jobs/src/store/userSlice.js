const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        add(state, action) {
            state.user = action.payload;
        },
    },
});

export const { add } = userSlice.actions;
export default userSlice.reducer;