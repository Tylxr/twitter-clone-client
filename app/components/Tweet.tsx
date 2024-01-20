import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@mui/material";

export default function Tweet() {
    return (
        <Card className="p-4 hover:bg-gray-50 hover:cursor-pointer">
            <div className="flex flex-col justify-between items-center">
                <div className="w-full h-full flex flex-row justify-between items-start">
                    <div className="mr-4 bg-sky-100 h-[50px] w-[50px] min-h-[50px] min-w-[50px] rounded-full"></div>
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <div className="mr-4 flex flex-row justify-center items-center">
                                <span className="font-bold cursor-pointer hover:text-sky-800">Tyler Marshall</span>
                                <span className="text-sky-800 text-sm ml-1" style={{ fontFamily: "Roboto-400" }}>
                                    @tylerjeremiahh
                                </span>
                            </div>
                            <div className="text-xs text-gray-400">8m</div>
                        </div>
                        <div className="mt-1 text-gray-700">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, quo laborum et ducimus
                            quis commodi modi porro nihil! Suscipit illum impedit corrupti? Esse nam quis ullam deserunt
                            delectus accusamus necessitatibus.
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-1 w-full h-full flex flex-row justify-end items-center">
                    <div className="ml-6 flex flex-row items-center text-sm text-gray-500 hover:text-red-600 cursor-pointer">
                        <FontAwesomeIcon icon="heart" className="w-4 mr-1" />
                        <span className="">98 likes</span>
                    </div>
                    <div className="ml-6 flex flex-row items-center cursor-pointer text-sm text-gray-500 hover:text-sky-600">
                        <FontAwesomeIcon icon="comment" className="w-4 mr-1" />
                        <span className="">14 comments</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
