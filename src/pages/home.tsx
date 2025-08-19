import { Button } from '@/components/ui/button'
import authService from '@/supabase/utils/auth'
import React from 'react'

const Home = () => {

    const handleLogout = async()=>{
        await authService.logout();
    }
    
  return (
    <div>
        <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Home