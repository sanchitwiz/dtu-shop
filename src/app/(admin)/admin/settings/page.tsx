import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='p-6'>
        <Link href='/admin'>
            <span className='text-blue-500 hover:underline'>Go to Admin Dashboard</span>
        </Link>
        <h1 className='text-2xl font-bold mt-4'>Settings Page - Yet to Complete</h1>
    </div>
  )
}

export default page
