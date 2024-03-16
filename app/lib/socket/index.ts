import { useAppSelector } from "@/app/store/hooks";
import { getCookie } from "cookies-next";
import { io, Socket } from "socket.io-client";
import jwtAboutToExpire from "../utils/jwtAboutToExpire";
import refreshToken from "../utils/refreshToken";

let socket: Socket;

export const initSocket = () => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER as string, {
        auth: (cb) => authCb(cb),
    });

    socket.io.on("error", (error) => {
        console.error(error);
        console.error("An error occurred with the Socket.io client.");
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
};

async function authCb(cb: (data: Object) => void) {
    let token = getCookie("twitter_token");
    if (!token || jwtAboutToExpire(token)) {
        console.log("SocketIO Auth: Access token has expired - refreshing!");
        await refreshToken();
        token = getCookie("twitter_token");
    }
    return cb({ token });
}
