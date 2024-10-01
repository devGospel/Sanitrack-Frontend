
import React from 'react'
import UsersForm from '@/components/user-management/usersForm'
import useUser from '@/hooks/useUser'

export default function EditUsers({userId}) {
    // const { editUser } = useUser()
    return (
        <div className=' h-screen max-w-5xl w-full mx-auto'>
            <UsersForm title={"Edit users"} btnText={"Edit user"} />
        </div>
    )
}
