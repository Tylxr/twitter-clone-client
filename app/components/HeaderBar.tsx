"use client";
import { Button, Card, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import coreFetch from "../lib/coreFetch";
import { publish } from "../lib/events";

export default function HeaderBar() {
    // Store, state, etc
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Functions
    const createPost = handleSubmit(async (data: FieldValues) => await save(data));
    const save = async (data: FieldValues) => {
        setSaving(true);
        try {
            const saveResponse = await coreFetch("/tweet", {
                method: "POST",
                body: { tweet: data.body },
            });
            if (saveResponse && saveResponse.status === 201) {
                setSaving(false);
                reset();
                setModalIsOpen(false);
                publish("post_created", null);
            } else {
                showError(saveResponse?.data?.errorMessage || "");
            }
        } catch (err) {
            showError();
        } finally {
            setSaving(false);
        }
    };

    // Error handler
    const showError = (message?: string) => {
        enqueueSnackbar(message || "Oops, something went wrong.", { variant: "error" });
    };

    return (
        <SnackbarProvider autoHideDuration={3000}>
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
                        <form>
                            <TextField
                                {...register("body", {
                                    required: "Cannot post an empty tweet.",
                                    minLength: {
                                        value: 1,
                                        message: "A tweet must be at least 1 character.",
                                    },
                                    maxLength: {
                                        value: 150,
                                        message: "A tweet can be up to 150 characters.",
                                    },
                                })}
                                size="small"
                                disabled={saving}
                                multiline
                                minRows={3}
                                label="Tweet"
                                error={!!errors.body}
                                helperText={errors.body?.message as string}
                                variant="outlined"
                                className="w-full mb-4 "
                            />
                        </form>
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
                                disabled={saving}
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
        </SnackbarProvider>
    );
}
