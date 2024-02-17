import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    username: string | undefined;
}

const initialState: AppState = {
    username: undefined,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

// Export actions
export const { setUser } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
