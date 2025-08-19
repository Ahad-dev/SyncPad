import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        auth:false,
        loading:true,
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload.user;
            state.auth=true;
            state.loading=false;
        },
        logout:(state)=>{
            state.user=null;
            state.auth=false;
        },
        finishLoading:(state)=>{
            state.loading=false;
        }
    }
})


export const { login, logout, finishLoading } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;