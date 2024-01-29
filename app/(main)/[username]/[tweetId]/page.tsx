import Tweet from "@/app/components/Tweet";
import { Button, Card, TextField } from "@mui/material";

export default function Page({ params }: { params: { tweetId: string } }) {
    return (
        <div>
            <div className="text-white mb-4">Back button here</div>
            <Tweet />
            <div className="w-full border-white border-solid border-0 border-b"></div>

            {/* Text box */}
            <Card className="py-3 px-2 my-4">
                <TextField label="Comment" multiline minRows={1} fullWidth />
                <div className="flex flex-row justify-between items-start">
                    <span className="text-gray-400 text-sm mt-1">59/180 characters</span>
                    <Button variant="contained" size="small" className="min-w-[100px] bg-sky-900 mt-2">
                        Post
                    </Button>
                </div>
            </Card>
        </div>
    );
}
