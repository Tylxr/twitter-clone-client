import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import { Tweet } from "@/app/lib/types";
import Avatar from "./Avatar";
import Link from "next/link";

interface TweetProps {
    data: Tweet;
}

export default function Tweet(props: TweetProps) {
    return (
        <Card className="p-4 mb-4 hover:cursor-pointer hover:bg-gray-50 border border-solid border-gray-100">
            <div className="flex flex-col justify-between items-center">
                <div className="w-full h-full flex flex-row justify-between items-start">
                    <Avatar
                        size="medium"
                        initial={props.data.userProfile.name?.[0]?.toUpperCase() || ""}
                        classOverride="mr-4 hidden"
                    />
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <Link
                                href="/tylerjeremiahh"
                                className="no-underline text mr-4 flex flex-col xs:flex-row justify-center items-start xs:items-center"
                            >
                                <span className="font-bold cursor-pointer hover:text-sky-800 text-gray-700">
                                    {props.data.userProfile.name}
                                </span>
                                <span className="text-sky-800 text-sm xs:ml-1" style={{ fontFamily: "Roboto-400" }}>
                                    @{props.data.userProfile.username}
                                </span>
                            </Link>
                            <div className="text-xs text-gray-400">8m</div>
                        </div>
                        <div className="mt-1 text-gray-700 text-sm xs:text-md">{props.data.body}</div>
                    </div>
                </div>
                <div className="mt-4 mb-1 w-full h-full flex flex-row justify-end items-center">
                    <div className="ml-6 flex flex-row items-center text-sm text-gray-500 hover:text-red-600 cursor-pointer">
                        <FontAwesomeIcon icon={faHeart} className="w-4 mr-1" />
                        <span>
                            <span>{props.data.likes.length}</span>
                            <span className="hidden xs:inline-block ml-1">
                                {props.data.likes.length === 1 ? "like" : "likes"}
                            </span>
                        </span>
                    </div>
                    <div className="ml-6 flex flex-row items-center cursor-pointer text-sm text-gray-500 hover:text-sky-600">
                        <FontAwesomeIcon icon={faComment} className="w-4 mr-1" />
                        <span>
                            <span>{props.data.comments.length}</span>
                            <span className="hidden xs:inline-block ml-1">
                                {props.data.comments.length === 1 ? "comment" : "comments"}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
