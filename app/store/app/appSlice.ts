import { UserProfile } from "@/app/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    username: string | undefined;
    userProfile: UserProfile | undefined;
}

const initialState: AppState = {
    username: undefined,
    userProfile: undefined,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserProfile: (state, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
        },
    },
});

// Export actions
export const { setUser, setUserProfile } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
