import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string;
}

const initialState: AuthState = {
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

// Export actions
export const { setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
