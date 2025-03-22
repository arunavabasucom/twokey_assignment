import { FileActions } from '@/components/file-actions';
import { Header } from '@/components/Header'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Home() {
   const {data : session} = useSession();
    return (
      <div>
        <Header logo={session?.user.image} />
        <FileActions />
    </div>
  )
}
