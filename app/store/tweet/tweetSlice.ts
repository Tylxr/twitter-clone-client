import { FeedSource, Tweet } from "@/app/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TweetState {
    mainFeed: Tweet[];
    followingFeed: Tweet[];
    userFeed: Tweet[];
}

const initialState: TweetState = {
    mainFeed: [],
    followingFeed: [],
    userFeed: [],
};

export const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        setFeed: (state, action: PayloadAction<{ source: FeedSource; feed: Tweet[] }>) => {
            state[`${action.payload.source}Feed`] = action.payload.feed;
        },
        toggleLikeOnTweet: (
            state,
            action: PayloadAction<{ source: "main" | "following" | "user"; tweetId: string; username: string }>
        ) => {
            const tweetIndex = state[`${action.payload.source}Feed`].findIndex((t) => t._id === action.payload.tweetId);
            if (tweetIndex < 0) return console.error("Unable to find tweet in store when attempting to toggle like.");
            const tweetHasLike = state[`${action.payload.source}Feed`][tweetIndex].likes.includes(
                action.payload.username
            );
            if (tweetHasLike) {
                const likeIndex = state[`${action.payload.source}Feed`][tweetIndex].likes.indexOf(
                    action.payload.username
                );
                state[`${action.payload.source}Feed`][tweetIndex].likes.splice(likeIndex, 1);
            } else {
                state[`${action.payload.source}Feed`][tweetIndex].likes.push(action.payload.username);
            }
        },
    },
});

// Export actions
export const { setFeed, toggleLikeOnTweet } = tweetSlice.actions;

// Export reducer
export default tweetSlice.reducer;
