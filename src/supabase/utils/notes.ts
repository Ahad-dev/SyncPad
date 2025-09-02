import type { Note, NoteInsert, NoteUpdate } from "@/types"
import supabase from "../client"

class Notes {
    // return type is a note
    async create(data: NoteInsert):Promise<Note> {
        const { data: note, error } = await supabase
            .from("notes")
            .insert([data])
            .select()
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return note
    }

    async update(id: string, data: NoteUpdate) {
        const { data: note, error } = await supabase
            .from("notes")
            .update(data)
            .eq("id", id)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return note
    }

    async delete(id: string) {
        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", id)

        if (error) {
            throw new Error(error.message)
        }
    }

    async getAll() {
        const { data: notes, error } = await supabase
            .from("notes")
            .select("*")

        if (error) {
            throw new Error(error.message)
        }

        return notes
    }

    async getById(id: string) {
        const { data: note, error } = await supabase
            .from("notes")
            .select("*")
            .eq("id", id)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return note
    }

    async getByOwnerId(owner_id: string) {
        const { data: notes, error } = await supabase
            .from("notes")
            .select("*")
            .eq("owner_id", owner_id)
            

        if (error) {
            throw new Error(error.message)
        }

        return notes
    }
}

const NotesService = new Notes()

export default NotesService