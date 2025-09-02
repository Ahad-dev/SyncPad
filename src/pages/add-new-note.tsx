import AddNewNoteView from '@/modules/notes/ui/views/add-new-Note-view'
import type { RootState } from '@/store/store'
import CollaboratorService from '@/supabase/utils/collaborator'
import NotesService from '@/supabase/utils/notes'
import type { Note } from '@/types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

interface AddNewNoteProps {
  title: string;
  isShared?: boolean;
}

const AddNewNote = ({ title,isShared }: AddNewNoteProps) => {

  const [role,setRole] = useState<string>("Owner") // Default to Owner for new/update
  const [note,setnote] = useState<Note>()
  const [loading, setLoading] = useState(true)
  const user = useSelector((state:RootState)=>state.auth.user)
  
  const params = useParams<{noteId:string}>()
  console.log(role)

  useEffect(()=>{
    const fetchNote = async () => {
      try {
        setLoading(true)
        const fetchedNote = await NotesService.getById(params.noteId!)
        setnote(fetchedNote)
        
        if(isShared){
          const {role} = await CollaboratorService.getColloboratorById({userId:user?.id!,note_id:params.noteId!})
          setRole(role)
        } else {
          // For new/update routes, user is the owner
          setRole("Owner")
        }
      } catch (error) {
        console.error("Error fetching note:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.noteId && user?.id) {
      fetchNote()
    }
  },[params.noteId, isShared, user?.id])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!note) {
    return <div className="flex items-center justify-center h-screen">Note not found</div>
  }

  return (
    <AddNewNoteView note={note!} title={title} role={role} />
  )
}

export default AddNewNote