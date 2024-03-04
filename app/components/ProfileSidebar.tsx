import Avatar from "./Avatar";
import coreFetch from "../lib/coreFetch";
import { faPencil, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";
import { setUserProfile } from "../store/app/appSlice";

export default function ProfileSidebar() {
    // Store, state, etc
    const dispatch = useAppDispatch();
    const username = useAppSelector(({ app }) => app.username);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editable, setEditable] = useState(false);
    const [localData, setLocalData] = useState({
        followersFormatted: "0",
        followingFormatted: "0",
        username: "",
        name: "",
        bio: "",
    });

    // Form hook setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: async () => {
            const { bio, name } = await getProfileData();
            return { bio, name };
        },
    });

    // Get profile data
    const getProfileData = async () => {
        try {
            const userProfileResponse = await coreFetch(`/userProfile/${username}`, { method: "GET" });

            if (userProfileResponse && userProfileResponse.status === 200) {
                setLocalData(userProfileResponse.data.userProfile);
                setLoading(false);
                dispatch(setUserProfile(userProfileResponse.data.userProfile));
                return userProfileResponse.data.userProfile;
            } else {
                console.error(
                    userProfileResponse
                        ? userProfileResponse.data.errorMessage
                        : "An error occurred trying to get the user profile data."
                );

                setLoading(false);
                return {};
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            return {};
        }
    };

    // Handle saving the form
    const handleSave = handleSubmit(async (data: FieldValues) => await save(data));
    const save = async ({ bio, name }: FieldValues) => {
        setSaving(true);
        try {
            const saveResponse = await coreFetch("/userProfile", {
                method: "PATCH",
                body: { bio, name },
            });
            if (saveResponse && saveResponse.status === 200) {
                setLocalData({ ...localData, bio, name });
                setEditable(false);
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
            <div className="mb-8 flex flex-row justify-center items-center">
                <Avatar initial={localData.username[0]?.toUpperCase()} size="huge" />
            </div>
            <div className="mb-8 flex flex-row justify-center items-center">
                <Card className="flex flex-col justify-center items-center p-4 mr-6">
                    <span className="font-bold text-xl">{localData.followersFormatted}</span>
                    <span className="text-sm">Followers</span>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 ml-6">
                    <span className="font-bold text-xl">{localData.followingFormatted}</span>
                    <span className="text-sm">Following</span>
                </Card>
            </div>
            <div className="mb-8">
                <Card className="p-4">
                    <div
                        onClick={() => (!editable ? setEditable(true) : handleSave())}
                        className={`${saving ? "pointer-events-none" : ""} hover:underline flex flex-row items-center justify-end text-sm hover:text-sky-800 text-gray-400 cursor-pointer`}
                    >
                        <span className="mr-2">{editable ? "Save" : "Edit"}</span>
                        {saving && <FontAwesomeIcon icon={faSpinner} className="w-4 text-lg fa-spin" />}
                        {!saving && <FontAwesomeIcon icon={editable ? faSave : faPencil} className="w-4 text-lg" />}
                    </div>
                    <div className="pb-4 border-gray-200 border-solid border-0 border-b-2">
                        {!loading && <span className="text-lg font-bold">{localData.username}</span>}
                        {loading && <Skeleton className="w-[190px] h-[28px]" />}
                    </div>
                    {editable && (
                        <form>
                            <TextField
                                {...register("name", {
                                    required: "Name is required.",
                                    minLength: {
                                        value: 4,
                                        message: "Name must be at least 4 characters.",
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Name can be up to 25 characters.",
                                    },
                                })}
                                disabled={isSubmitting}
                                size="small"
                                label="Name"
                                focused={true}
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                                className="w-full mb-4"
                            />
                            <TextField
                                {...register("bio", {
                                    maxLength: {
                                        value: 200,
                                        message: "Bio can be up to 200 characters.",
                                    },
                                })}
                                multiline
                                rows={4}
                                disabled={isSubmitting}
                                size="small"
                                label="Bio"
                                focused={true}
                                variant="outlined"
                                error={!!errors.bio}
                                helperText={errors.bio?.message as string}
                                className="w-full mb-4"
                            />
                        </form>
                    )}
                    {!editable && !loading && (
                        <div>
                            <p className="mb-1 font-medium">{localData.name}</p>
                            <p className="text-sm m-0">{localData.bio}</p>
                        </div>
                    )}
                    {!editable && loading && (
                        <div className="mt-4">
                            <Skeleton className="h-[20px] w-[160px] mb-1" />
                            <Skeleton className="h-[10px] w-[240px]" count={1} />
                        </div>
                    )}
                </Card>
            </div>
        </SnackbarProvider>
    );
}
