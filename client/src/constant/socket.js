import { io } from "socket.io-client";


export const socket = io("http://localhost:3000", 
    {
        query: {
            userId: JSON.parse(localStorage.getItem("userInfo"))?._id,
          },
    withCredentials: true
    }
);

