"use client";

import Comment from "@/app/components/Comment";
import Tweet from "@/app/components/Tweet";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { tweetId: string } }) {
    const router = useRouter();

    return (
        <div>
            <div onClick={() => router.back()}>
                <span className="cursor-pointer text-white hover:text-gray-200 flex flex-row justify-start items-center mb-6">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                    <span className="ml-2">Back</span>
                </span>
            </div>
            <Tweet />
            <div className="w-full border-white border-solid border-0 border-b"></div>

            <Card className="py-4 px-4 my-4">
                <TextField label="Comment" multiline minRows={1} fullWidth />
                <div className="flex flex-row justify-between items-start">
                    <span className="text-gray-400 text-sm mt-1">59/180 characters</span>
                    <Button variant="contained" size="small" className="min-w-[100px] bg-sky-900 mt-4">
                        Post
                    </Button>
                </div>
            </Card>

            <Card>
                <Comment likeCount={4} />
                <Comment likeCount={12} />
                <Comment likeCount={0} />
            </Card>
        </div>
    );
}
