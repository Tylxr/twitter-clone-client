import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER as string, {
        reconnectionDelayMax: 10000,
        auth: {
            token: "123",
        },
        query: {
            "my-key": "my-value",
        },
        // withCredentials: true,
    });

    /**     Example of how to implement auth
     * 
     * const socket = io({
            auth: (cb) => {
                cb({ token: localStorage.token })
            }
        });
     */

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
