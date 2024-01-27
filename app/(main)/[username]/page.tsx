import Tweet from "@/app/components/Tweet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@mui/material";

export default function Page({ params }: { params: { username: string } }) {
    const data: any = {
        followers: "849",
        following: "356",
        initial: "L",
        bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta doloremque sunt neque id veniam! Nesciunt, quod dolore, corporis adipisci labore deserunt repudiandae facere explicabo illum expedita laudantium quia animi exercitationem.",
        name: "Lauren Addison",
    };

    if (!data) {
        return <p className="text-white">No user found with username: {params.username}</p>;
    }

    return (
        <div>
            {/* User's profile */}
            <div className="text-white flex flex-row justify-between items-start border-white border-solid border-0 border-b pb-4 mb-4">
                <Card className="p-4 mx-2 max-w-[400px]">
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        <span className="text-lg font-bold">{params.username}</span>
                    </div>
                    <div>
                        <p className="mb-1 font-medium">{data.name}</p>
                        <p className="text-sm m-0">{data.bio}</p>
                    </div>
                </Card>
                <div className="flex flex-col justify-center items-between mx-2">
                    <Card className="flex flex-col justify-center items-center p-4 mb-2 max-w-[70px]">
                        <span className="font-bold text-xl">{data.followers}</span>
                        <span className="text-sm">Followers</span>
                    </Card>
                    <Card className="flex flex-col justify-center items-center p-4 mt-2 max-w-[70px]">
                        <span className="font-bold text-xl">{data.following}</span>
                        <span className="text-sm">Following</span>
                    </Card>
                </div>
                <div className="flex flex-col justify-center items-center mx-2">
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <div className="bg-sky-700 h-[80px] w-[80px] rounded-full flex flex-row justify-center items-center">
                            <span className="font-bold text-white" style={{ fontSize: 25 }}>
                                T
                            </span>
                        </div>
                    </div>

                    <Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-white text-white">
                        Follow
                    </Button>
                </div>
            </div>

            {/* User's tweets */}
            {/* TODO: Limit to 5 at a time */}
            <div>
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </div>
    );
}
