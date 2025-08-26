import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

interface AuthState {
    user: User | null;
    auth: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    auth: false,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.auth = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.auth = false;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
  },
})


export const { login, logout, finishLoading } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;