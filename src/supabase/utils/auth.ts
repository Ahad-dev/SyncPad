import { APP_ROUTE } from "@/contants";
import supabase from "../client";
import type { Provider } from "@supabase/supabase-js";

class Auth {
    async signUp({email, password}:{email:string, password:string}){
        const {data, error} = await supabase.auth.signUp({ email, password ,options:{emailRedirectTo:APP_ROUTE}},);
        return {data,error};
    }
    async checkAuth(){
        const {data, error} = await supabase.auth.getUser();
        return {data, error};
    }

    async signIn({email, password}:{email:string, password:string}){
        const {data, error} = await supabase.auth.signInWithPassword({ email, password });
        return {data, error};
    }
    async logout(){
        const {error} = await supabase.auth.signOut();
        return {error};
    }
    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
            redirectTo: `${APP_ROUTE}update-password`
        });
        console.log("Password reset email sent:", data);
        console.log("Error sending password reset email:", error);
        return { data, error };
    }
    async updatePassword(newPassword: string) {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        return { data, error };
    }
    async signInWithProvider(provider: Provider) {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider });
        return { data, error };
    }

}

const authService = new Auth()

export default authService;