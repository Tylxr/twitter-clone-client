import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import { FeedSource, Tweet } from "@/app/lib/types";
import Avatar from "./Avatar";
import Link from "next/link";
import coreFetch from "../lib/coreFetch";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLikeOnTweet } from "../store/tweet/tweetSlice";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface TweetProps {
    data: Tweet;
    source?: FeedSource;
}

export default function Tweet(props: TweetProps) {
    // Store, state, etc
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(({ app }) => app.username);
    const [liked, setLiked] = useState<boolean>(props.data.likes.includes(currentUser as string));
    const [likes, setLikes] = useState<string[]>(props.data.likes);

    // Functions
    const toggleLike = async () => {
        try {
            // Immediately fill toggle like/dislike for UX responsivity
            if (!!props.source) {
                dispatch(
                    toggleLikeOnTweet({
                        source: props.source,
                        tweetId: props.data._id,
                        username: currentUser as string,
                    })
                );
            }
            setLiked(!liked);
            setLikes(
                likes.includes(currentUser as string)
                    ? likes.splice(likes.indexOf(currentUser as string), 1)
                    : [...likes, currentUser as string]
            );

            // Perform request
            const response = await coreFetch(`/tweet/${props.data._id}/like`, { method: "PATCH" });
            if (!response || response.data.error) {
                setLiked(!liked);
                if (!!props.source) {
                    // Revert toggle of like
                    dispatch(
                        toggleLikeOnTweet({
                            source: props.source,
                            tweetId: props.data._id,
                            username: currentUser as string,
                        })
                    );
                }
            }
        } catch (err) {
            console.error(err);
            setLiked(!liked);
            if (!!props.source) {
                // Revert toggle of like
                dispatch(
                    toggleLikeOnTweet({
                        source: props.source,
                        tweetId: props.data._id,
                        username: currentUser as string,
                    })
                );
            }
        }
    };

    return (
        <Card className="mb-4 hover:cursor-pointer hover:bg-gray-50 border border-solid border-gray-100">
            <div className="tweet-body p-4 flex flex-col justify-between items-center">
                <div className="w-full h-full flex flex-row justify-between items-start">
                    <Avatar
                        size="medium"
                        initial={props.data.userProfile.name?.[0]?.toUpperCase() || ""}
                        classOverride="mr-4 hidden"
                    />
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <Link
                                href={`/${props.data.userProfile.username}`}
                                className="username no-underline hover:text-sky-500 text-gray-700 mr-4 flex flex-col xs:flex-row justify-center items-start xs:items-center"
                            >
                                <span className="username font-bold cursor-pointer">{props.data.userProfile.name}</span>
                                <span className="username text-sm xs:ml-1" style={{ fontFamily: "Roboto-400" }}>
                                    @{props.data.userProfile.username}
                                </span>
                            </Link>
                            <div className="text-xs text-gray-400">8m</div>
                        </div>
                        <div className="mt-1 text-gray-700 text-sm xs:text-md">{props.data.body}</div>
                    </div>
                </div>
                <div className="mt-4 mb-1 w-full h-full flex flex-row justify-end items-center">
                    <div
                        onClick={() => toggleLike()}
                        className={`ml-8 flex flex-row items-center text-sm text-gray-500 hover:text-red-400 cursor-pointer ${liked && "text-red-600"}`}
                    >
                        <FontAwesomeIcon size="lg" icon={faHeart} className="like mr-2" />
                        <span>
                            <span>{props.data.likes.length}</span>
                            <span className="hidden xs:inline-block ml-1">
                                {props.data.likes.length === 1 ? "like" : "likes"}
                            </span>
                        </span>
                    </div>
                    <Link
                        href={`/${props.data.userProfile.username}/${props.data._id}`}
                        className="ml-8 flex flex-row items-center cursor-pointer text-sm text-gray-500 hover:text-sky-600"
                    >
                        <FontAwesomeIcon size="lg" icon={faComment} className="mr-2" />
                        <span>
                            <span>{props.data.comments.length}</span>
                            <span className="hidden xs:inline-block ml-1">
                                {props.data.comments.length === 1 ? "comment" : "comments"}
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
