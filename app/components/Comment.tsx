import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import Avatar from "./Avatar";

interface CommentProps {
    likeCount: number;
}

export default function Comment(props: CommentProps) {
    return (
        <Card className="px-4 py-2 hover:cursor-pointer hover:bg-gray-50 border border-solid border-gray-100">
            <div className="flex flex-col justify-between items-start">
                <div className="w-full h-full flex flex-row justify-between items-center">
                    <Avatar initial="D" size="small" classOverride="mr-2" />
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <div className="mr-4 flex flex-row justify-center items-center">
                                <span className="font-bold cursor-pointer hover:text-sky-800">Tyler Marshall</span>
                                <span className="text-sky-800 text-sm ml-1" style={{ fontFamily: "Roboto-400" }}>
                                    @tylerjeremiahh
                                </span>
                            </div>
                            <div className="text-xs text-gray-400">1h</div>
                        </div>
                    </div>
                </div>
                <div className="mt-1 text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos inventore fugiat fuga
                    adipisci, officiis quia maxime est eveniet perferendis quod? Impedit animi dicta et tenetur eius,
                    facilis vitae optio sed?
                </div>
                <div className="mt-2 mb-1 w-full h-full flex flex-row justify-end items-center">
                    <div className="ml-6 flex flex-row items-center text-sm text-gray-500 hover:text-red-600 cursor-pointer">
                        <FontAwesomeIcon icon={faHeart} className="w-4 mr-1" />
                        <span>
                            {props.likeCount} {props.likeCount === 1 ? "like" : "likes"}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
