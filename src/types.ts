import type { Database } from "./supabase/types";

export type User = Database["public"]['Tables']['collaborators']['Row']
export type NoteInsert = Database["public"]['Tables']['notes']['Insert']
export type NoteUpdate = Database["public"]['Tables']['notes']['Update']
export type Note = Database["public"]['Tables']['notes']['Row']