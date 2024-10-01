
import UsersForm from '@/components/user-management/usersForm'
import React from 'react'

export default function AddUsers() {
    return (
        <div className=' h-screen max-w-5xl w-full mx-auto'>
            <UsersForm title={"Add users"} btnText={"Add user"}/>
        </div>
    )
}
