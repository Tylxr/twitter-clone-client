import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TweetState {
    mainFeed: any[]; // TODO: Typing
    followingFeed: any[]; // TODO: Typing
}

const initialState: TweetState = {
    mainFeed: [],
    followingFeed: [],
};

export const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        setMainFeed: (state, action: PayloadAction<any[]>) => {
            // TODO: Typing
            state.mainFeed = action.payload;
        },
        setFollowingFeed: (state, action: PayloadAction<any[]>) => {
            // TODO: Typing
            state.followingFeed = action.payload;
        },
    },
});

// Export actions
export const { setMainFeed, setFollowingFeed } = tweetSlice.actions;

// Export reducer
export default tweetSlice.reducer;
