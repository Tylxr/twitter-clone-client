import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    error: boolean;
    errorMessage: string;
}

const initialState: AppState = {
    error: false,
    errorMessage: "",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = !!action.payload;
            state.errorMessage = action.payload;
        },
    },
});

// Export actions
// export const { setToken } = tweetSlice.actions;

// Export reducer
export default appSlice.reducer;
