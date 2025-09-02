import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

interface HeaderDashboardProps {
  onNewNote: () => void
}

const HeaderDashboard = ({ onNewNote }: HeaderDashboardProps) => {
  return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">Manage your notes and collaborations</p>
              </div>
              <Button onClick={onNewNote} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
    
  )
}

export default HeaderDashboard