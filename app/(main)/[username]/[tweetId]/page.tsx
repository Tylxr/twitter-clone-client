"use client";

import Comment from "@/app/components/Comment";
import Tweet from "@/app/components/Tweet";
import coreFetch from "@/app/lib/coreFetch";
import { Comment as CommentType, Tweet as TypeTweet } from "@/app/lib/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";

export default function Page({ params }: { params: { tweetId: string } }) {
    // Store, state, etc
    const router = useRouter();
    const [tweet, setTweet] = useState<TypeTweet | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const commentCharacters = watch("comment", "");

    // Functions
    const fetchData = async (disableLoading: boolean) => {
        if (!disableLoading) setLoading(true);
        const response = await coreFetch(`/tweet/${params.tweetId}`, { method: "GET" });
        if (response && !response.data.error) {
            setTweet(response.data.tweet);
        } else {
            setHasError(true);
        }
        if (!disableLoading) setLoading(false);
    };
    const comment = handleSubmit(async (data: FieldValues) => await postComment(data.comment));
    const postComment = async (comment: string) => {
        try {
            const commentResponse = await coreFetch(`/tweet/${params.tweetId}/comment`, {
                method: "PATCH",
                body: {
                    comment,
                },
            });
            if (commentResponse && commentResponse.status === 200) {
                reset();
                await fetchData(true);
            } else {
                commentError(commentResponse?.data?.errorMessage);
            }
        } catch (err) {
            console.error(err);
            commentError();
        }
    };
    const commentError = (message?: string) => {
        enqueueSnackbar(message || "Oops, something went wrong.", { variant: "error" });
    };

    // Lifecycle hooks
    useEffect(() => {
        fetchData(false);
    }, [params.tweetId]);

    return (
        <SnackbarProvider autoHideDuration={3000}>
            <div className="mt-4 w-full">
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
                    <form>
                        <TextField
                            {...register("comment", {
                                required: "Comment is required.",
                                maxLength: {
                                    value: 100,
                                    message: "Comment can be up to 100 characters.",
                                },
                            })}
                            disabled={isSubmitting}
                            label="Comment"
                            multiline
                            minRows={4}
                            error={!!errors.comment}
                            helperText={errors.comment?.message as string}
                            fullWidth
                        />
                        <div className="flex flex-row justify-between items-start">
                            <span
                                className={`text-sm mt-1 ${commentCharacters.length > 100 ? "text-red-500" : "text-gray-400"}`}
                            >
                                {commentCharacters.length}/100 characters
                            </span>
                            <Button
                                onClick={() => comment()}
                                variant="contained"
                                size="small"
                                className="min-w-[100px] bg-sky-900 mt-4"
                                disabled={isSubmitting}
                            >
                                Post
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Comments */}
                {reverse(sortBy(tweet?.comments || [], "createdDate")).map((comment: CommentType, i: number) => (
                    <Comment key={i} data={comment} />
                ))}
            </div>
        </SnackbarProvider>
    );
}
