import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@mui/material";

interface ProfileSidebarProps {
    initial: string;
    username: string;
    followers: string;
    following: string;
    name: string;
    bio: string;
}

export default function ProfileSidebar(props: ProfileSidebarProps) {
    return (
        <div>
            <div className="mb-8 flex flex-row justify-center items-center">
                <div className="bg-lime-300 h-40 w-40 rounded-full flex flex-row justify-center items-center">
                    <span className="font-bold text-white" style={{ fontSize: 50 }}>
                        {props.initial}
                    </span>
                </div>
            </div>
            <div className="mb-8 flex flex-row justify-center items-center">
                <Card className="flex flex-col justify-center items-center p-4 mr-6">
                    <span className="font-bold text-xl">{props.followers}</span>
                    <span className="text-sm">Followers</span>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 ml-6">
                    <span className="font-bold text-xl">{props.following}</span>
                    <span className="text-sm">Following</span>
                </Card>
            </div>
            <div className="mb-8">
                <Card className="p-4">
                    <div className="flex flex-row items-center justify-end text-sm hover:text-sky-800 text-gray-400 cursor-pointer">
                        <span className="mr-2">Edit</span>
                        <FontAwesomeIcon icon={faPencil} className="w-4" />
                    </div>
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        <span className="text-lg font-bold">{props.username}</span>
                    </div>
                    <div>
                        <p className="mb-1 font-medium">{props.name}</p>
                        <p className="text-sm m-0">{props.bio}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
