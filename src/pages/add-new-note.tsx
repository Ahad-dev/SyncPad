import AddNewNoteView from '@/modules/notes/ui/views/add-new-Note-view'
import NotesService from '@/supabase/utils/notes'
import type { Note } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface AddNewNoteProps {
  title: string
  buttonText: string
}

const AddNewNote = ({ title, buttonText }: AddNewNoteProps) => {

  const [note,setnote] = useState<Note>()
  
  const params = useParams<{noteId:string}>()
  console.log(params)

  useEffect(()=>{
    const fetchNote = async () => {
      const fetchedNote = await NotesService.getById(params.noteId!)
      setnote(fetchedNote)
    }

    fetchNote()
  },[params.noteId])

  return (
    <AddNewNoteView note={note!} title={title} buttonText={buttonText} />
  )
}

export default AddNewNote