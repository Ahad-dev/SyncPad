import type { Database } from "./supabase/types";

export type User = Database["public"]['Tables']['collaborators']['Row']
export type NoteInsert = Database["public"]['Tables']['notes']['Insert']
export type NoteUpdate = Database["public"]['Tables']['notes']['Update']
export type Note = Database["public"]['Tables']['notes']['Row']
export type CollaboratorInsert = Database["public"]["Tables"]["collaborators"]["Insert"]
export type Collaborator = Database["public"]["Tables"]["collaborators"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// merge the type of NOTE and PROFILE
export type SharedNote = Note & { profile: Profile }