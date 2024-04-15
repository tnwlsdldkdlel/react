import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = {
    email: ""
}

// Redux Toolkit의 비동기 처리 기능
// API 를 통해 fulfilled, rejected, pending 3가지 상태에 대해 reducer 를 작성할 수 있다.
// redux-saga 에서만 사용할 수 있던 기능(이미 호출한 API 요청 취소하기 등)도 사용할 수 있다.
export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {
        // login: (state, action) => {
        //     console.log("login.....")
        //     const data = action.payload; //{email, pw로 구성 } 
        //     return data; // 새로운 상태
        // },
        logout: (state, action) => {
            console.log("logout....")
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");

            const payload = action.payload;
            return payload;
        })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected");
            })
    }
})
export const { login, logout } = loginSlice.actions
export default loginSlice.reducer