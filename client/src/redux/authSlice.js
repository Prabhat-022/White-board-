import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../constant/axios";
import toast from "react-hot-toast";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const tokenFromStorage = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : null;

const initialState = {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null
}

// Register user
export const registerUser = createAsyncThunk("auth/registerUser", async (user) => {
    const response = await axiosInstance.post("/auth/signup", user)
    toast.success("User registered successfully")

    localStorage.setItem("userInfo", JSON.stringify(response.data));
    localStorage.setItem("jwt", response.data.token);

    console.log("registerUser", response);
    
    return response.json()
})

// Login user
export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
    try {
        const response = await axiosInstance.post("/auth/login", user)
        toast.success("User logged in successfully")

        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("jwt", response.data.token);

        console.log("loginUser", response)

        return response.json()
        
    } catch (error) {
        console.log("Error in login controller", error.message)
        return error.response.data.message
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('jwt');
        },
    },
    extraReducers: (builder) => {
        //login builder 
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Register builder 
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions
