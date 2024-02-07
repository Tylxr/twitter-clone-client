import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TweetState {
    feed: string;
}

const initialState: TweetState = {
    feed: "",
};

export const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        // setToken: (state, action: PayloadAction<string>) => {
        //     state.token = action.payload;
        // },
    },
});

// Export actions
// export const { setToken } = tweetSlice.actions;

// Export reducer
export default tweetSlice.reducer;
