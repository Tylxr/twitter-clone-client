"use client";

import Comment from "@/app/components/Comment";
import Tweet from "@/app/components/Tweet";
import coreFetch from "@/app/lib/coreFetch";
import { Tweet as TypeTweet } from "@/app/lib/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Page({ params }: { params: { tweetId: string } }) {
    const router = useRouter();
    const [tweet, setTweet] = useState<TypeTweet | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await coreFetch(`/tweet/${params.tweetId}`, { method: "GET" });
            if (response && !response.data.error) {
                setTweet(response.data.tweet);
            } else {
                setHasError(true);
            }
            setLoading(false);
        };

        fetchData();
    }, [params.tweetId]);

    return (
        <div className="mt-4">
            {/* Back button */}
            <div onClick={() => router.back()} className="w-fit">
                <span className="cursor-pointer text-white hover:text-gray-200 flex flex-row justify-start items-center mb-6">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                    <span className="ml-2">Back</span>
                </span>
            </div>

            {/* Tweet */}
            {tweet && !loading && <Tweet data={tweet} />}

            {/* Loading */}
            {!tweet && loading && <Skeleton baseColor="#c5c5c5" highlightColor="#ffffff" height={110} />}

            {/* Has Error */}
            {hasError && (
                <Card className="py-4 px-4 my-4 text-center">
                    <p>Oops, unable to retrieve tweet! Try again later.</p>
                </Card>
            )}

            <div className="w-full border-white border-solid border-0 border-b"></div>

            <Card className="py-4 px-4 my-4">
                <TextField label="Comment" multiline minRows={4} fullWidth />
                <div className="flex flex-row justify-between items-start">
                    <span className="text-gray-400 text-sm mt-1">59/180 characters</span>
                    <Button variant="contained" size="small" className="min-w-[100px] bg-sky-900 mt-4">
                        Post
                    </Button>
                </div>
            </Card>

            <Comment likeCount={4} />
            <Comment likeCount={12} />
            <Comment likeCount={0} />
        </div>
    );
}
