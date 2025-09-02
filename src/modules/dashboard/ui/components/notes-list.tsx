import { Card, CardHeader,CardTitle,CardContent } from '@/components/ui/card'
import type { Note } from '@/types'
import { FileText} from 'lucide-react'
import React from 'react'
import NoteCard from './note-card'

interface NotesListProps {
  notes:Note[]
  Icon: React.ComponentType<any>
  role:string,
  title:string
}

const NotesList = ({
  notes,
  Icon,
  role,
  title
}: NotesListProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${role == "Owner" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-green-100 dark:bg-green-900/30"} rounded-lg`}>
            <Icon className={`h-5 w-5 ${role == "Owner" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`} />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{notes.length} notes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No notes yet.</p>
            <p className="text-sm text-muted-foreground">Create your first note to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                role={role}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NotesList