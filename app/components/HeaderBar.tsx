"use client";
import { Button, Card, Modal, TextField } from "@mui/material";
import { useState } from "react";

export default function HeaderBar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const createPost = () => setModalIsOpen(false);

    return (
        <div className="bg-black-gradient w-full py-4 mb-2 flex flex-row justify-center items-center border-white border-solid border-0 border-b">
            <div className="w-[1200px]">
                <div className="mx-4 flex flex-row justify-between items-center">
                    <h1 className="text-[30px] m-0 text-white" style={{ fontFamily: "Roboto-700" }}>
                        Twitter
                    </h1>
                    <Button
                        onClick={() => setModalIsOpen(true)}
                        variant="outlined"
                        size="small"
                        className="mx-4 min-w-[100px] border-white text-white"
                    >
                        New Post
                    </Button>
                </div>
            </div>

            <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <Card className="p-6 xs:w-[400px] drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h3 className="mb-5 mt-0">What are you thinking about?</h3>
                    <TextField
                        id="outlined-basic"
                        size="small"
                        multiline
                        minRows={3}
                        label="Tweet"
                        variant="outlined"
                        className="w-full mb-4 "
                    />
                    <div className="w-full flex justify-center items-center">
                        <Button
                            onClick={() => setModalIsOpen(false)}
                            variant="outlined"
                            size="small"
                            className="mx-4 min-w-[100px] border-black text-black"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => createPost()}
                            variant="contained"
                            size="small"
                            className="mx-4 min-w-[100px] text-white bg-sky-900"
                        >
                            Post
                        </Button>
                    </div>
                </Card>
            </Modal>
        </div>
    );
}
