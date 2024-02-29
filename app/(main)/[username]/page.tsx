"use client";

import Avatar from "@/app/components/Avatar";
import { getUserFeedData } from "@/app/components/feed/hooks";
import Tweet from "@/app/components/Tweet";
import coreFetch from "@/app/lib/coreFetch";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setFeed } from "@/app/store/tweet/tweetSlice";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Page({ params }: { params: { username: string } }) {
    // Store, state, etc
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const dispatch = useAppDispatch();
    const feed = useAppSelector(({ tweet }) => tweet.userFeed);
    const [localData, setLocalData] = useState({
        followersFormatted: "0",
        followingFormatted: "0",
        username: "",
        name: "",
        bio: "",
    });

    // Lifecycle hooks
    useEffect(() => {
        // Get user's feed
        const getFeedData = async () => {
            const { error, feed } = await getUserFeedData(params.username);
            if (!error) {
                dispatch(setFeed({ source: "user", feed }));
            }
        };

        // Get profile data
        const getProfileData = async () => {
            try {
                const userProfileResponse = await coreFetch(`/userProfile/${params.username}`, { method: "GET" });

                if (userProfileResponse && userProfileResponse.status === 200) {
                    setLocalData(userProfileResponse.data.userProfile);
                } else {
                    console.error(
                        userProfileResponse
                            ? userProfileResponse.data.errorMessage
                            : "An error occurred trying to get the user profile data."
                    );
                    setInvalidUsername(true);
                }
            } catch (err) {
                console.error(err);
                setInvalidUsername(true);
            } finally {
                setLoading(false);
            }
        };

        Promise.allSettled([getFeedData(), getProfileData()]);
    }, [dispatch, params.username]);

    // Early exit
    if (invalidUsername) {
        return <p className="text-white">No user found with username: {params.username}</p>;
    }

    return (
        <div className="mt-4 w-full">
            {/* Back button */}
            <div onClick={() => router.back()} className="w-fit">
                <span className="cursor-pointer text-white hover:text-gray-200 flex flex-row justify-start items-center mb-6">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                    <span className="ml-2">Back</span>
                </span>
            </div>

            {/* User's profile */}
            <div className="w-full h-full flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center border-white border-solid border-0 border-b pb-4 mb-4">
                <Card className="p-4 w-full max-w-[400px] md:max-w-[600px] order-3 md:order-1 md:my-0 my-2">
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        <span className="text-lg font-bold">{params.username}</span>
                    </div>
                    {!loading && (
                        <div>
                            <p className="mb-1 font-medium">{localData?.name}</p>
                            <p className="text-sm m-0">{localData?.bio}</p>
                        </div>
                    )}
                    {loading && (
                        <div className="mt-4">
                            <Skeleton className="h-[28px] w-[160px] mb-1" />
                            <Skeleton className="h-[14px] w-[240px]" count={2} />
                        </div>
                    )}
                </Card>
                <div className="flex flex-row justify-between items-center order-2 md:my-0 my-2">
                    <Card className="flex flex-col justify-center items-center p-4 mx-4 my-2 max-w-[70px] min-w-[70px]">
                        <span className="font-bold text-xl">{localData?.followersFormatted}</span>
                        <span className="text-sm">Followers</span>
                    </Card>
                    <Card className="flex flex-col justify-center items-center p-4 mx-4 my-2 max-w-[70px] min-w-[70px]">
                        <span className="font-bold text-xl">{localData?.followingFormatted}</span>
                        <span className="text-sm">Following</span>
                    </Card>
                </div>
                <div className="flex flex-col justify-center items-center order-1 md:order-3 md:my-0 my-2">
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <Avatar initial={localData?.username?.[0]?.toUpperCase()} size="large" />
                    </div>

                    <Button variant="outlined" size="small" className="min-w-[100px] border-white text-white">
                        Follow
                    </Button>
                </div>
            </div>

            {/* User's tweets */}
            <div>{feed?.map((tweet) => <Tweet key={tweet._id} data={tweet} source={"user"} />)}</div>
        </div>
    );
}
