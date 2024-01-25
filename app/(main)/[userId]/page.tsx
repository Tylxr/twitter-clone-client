import { Button, Card } from "@mui/material";

interface UserProfileProps {
    followers: string;
    following: string;
    initial: string;
}

export default function Page(props: UserProfileProps) {
    return (
        <div className="text-white flex flex-row justify-between items-center">
            <div>
                <Card>bio card</Card>
            </div>
            <div className="flex flex-col justify-center items-between">
                <Card className="flex flex-col justify-center items-center p-4 mb-2">
                    <span className="font-bold text-xl">{props.followers}</span>
                    <span className="text-sm">Followers</span>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 mt-2">
                    <span className="font-bold text-xl">{props.following}</span>
                    <span className="text-sm">Following</span>
                </Card>
            </div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mb-8 flex flex-row justify-center items-center">
                    <div className="bg-sky-700 h-[80px] w-[80px] rounded-full flex flex-row justify-center items-center">
                        <span className="font-bold text-white" style={{ fontSize: 25 }}>
                            T
                        </span>
                    </div>
                </div>

                <Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-white text-white">
                    New Post
                </Button>
            </div>
        </div>
    );
}
