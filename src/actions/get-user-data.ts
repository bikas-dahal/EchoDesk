'use server'

import { createClientServer } from "@/supabase/server";
import { Users } from "@/types/app";

export const getUserData = async (): Promise<Users | null> => {
    const supabase = await createClientServer();

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        console.log(user, 'No user found')
        return null
    }

    // console.log('current auth user', user)

    const {data, error} = await supabase.from('users').select('*').eq('id', user.id).single()

    // console.log('data from db', data)

    if (error) {
        console.log(error, 'Error getting user data')
        return null
    }

    return data ? data : null
}