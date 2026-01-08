import { Server } from 'socket.io';

export const io = new Server({
    cors: {
        origin: "*", // In production, restrict this to your frontend's URL
        methods: ["GET", "POST"]
    }
});
