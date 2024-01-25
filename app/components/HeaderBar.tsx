import { Button } from "@mui/material";

export default function HeaderBar() {
    return (
        <div className="bg-black-gradient w-full py-4 mb-2 flex flex-row justify-center items-center border-white border-solid border-0 border-b">
            <div className="w-[1200px]">
                <div className="mx-4 flex flex-row justify-between items-center">
                    <h1 className="text-[30px] m-0 text-white" style={{ fontFamily: "Roboto-700" }}>
                        Twitter
                    </h1>
                    <Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-white text-white">
                        New Post
                    </Button>
                </div>
            </div>
        </div>
    );
}
