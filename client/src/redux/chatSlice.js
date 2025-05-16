import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../constant/axios";

const initialState = {
    messages: [],
    loading: false,
    error: null
}

const token = localStorage.getItem("jwt")

// send the message
export const sendMessage = createAsyncThunk("chat/sendMessage", async ({message, roomId}) => {
    console.log('message', message)
    console.log('roomId', roomId)

    const response = await axiosInstance.post(`/groupchat/send-message`, { message, roomId }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
    })
    console.log("send Message: ", response.data);
    return response.data
})

// receive the message
export const receiveMessage = createAsyncThunk("chat/receiveMessage", async (roomId) => {
    console.log("roomId", roomId);

    const response = await axiosInstance.get(`/groupchat/get-messages/${roomId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
    })

    localStorage.setItem("chat", JSON.stringify(response.data))
    console.log("get Message: ", response.data);
    return response.data;
})

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.messages= [...state.messages, action.payload]
            state.loading = false;
            state.error = false;
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(receiveMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(receiveMessage.fulfilled, (state, action) => {
            state.messages = [...action.payload]
            state.loading = false;
            state.error = false;
        })
        builder.addCase(receiveMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default chatSlice.reducer
