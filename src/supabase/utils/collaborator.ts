import type { Collaborator, CollaboratorInsert } from "@/types";
import supabase from "../client";
import { id } from "date-fns/locale";

class Collaborators {
    async addCollaborator({ email, role, note_id }:{email:string, role:string, note_id:string}) {
        console.log(email)
        const {data:col,error:err} = await supabase
        .from('profiles')
        .select('*')
        .eq('email',email)
        .single();
        console.log(col);
        if(err){
            throw new Error(`Failed to fetch user: ${err.message}`);
        }
    
        const collaborator = {
            user_id: col.id,
            role,
            note_id
        };

        const { data, error } = await supabase
            .from("collaborators")
            .insert([collaborator])
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async getCollaboratorOfNotes(noteId:string):Promise<any[]>{
        console.log(noteId);

            const { data, error } = await supabase
            .from('collaborators')
            .select(`
                id,
                note_id,
                user_id,
                role,
                profile:profiles (
                id,
                email,
                name,
                avatar_url
                )
            `)
            .eq('note_id', noteId);

                console.log(data);
        if(error){
            throw new Error(error.message);
        }
        return data;
    }
    async getColloboratorById({userId,note_id}:{userId:string,note_id:string}):Promise<{role:string}>{
        try{
            const { data, error } = await supabase
            .from('collaborators')
            .select(`
                role
            `)
            .eq('user_id', userId)
            .eq('note_id', note_id)
            .single();

            if (error) {
                throw new Error(error.message);
            }
            return data;
        }catch (error) {
            console.error("Error fetching collaborator by ID:", error);
            throw error;
        }
    }
}

const CollaboratorService = new Collaborators();

export default CollaboratorService;
