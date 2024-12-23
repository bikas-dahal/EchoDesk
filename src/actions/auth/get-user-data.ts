'use server'

import { supabaseServerClientPages } from "@/supabase/page";
import { createClientServer } from "@/supabase/server";
import { User } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export const getUserData = async (): Promise<User | null> => {
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


export const getUserDataByPages = async (req: NextApiRequest, res: NextApiResponse): Promise<User | null> => {
    const supabase = await supabaseServerClientPages(req, res);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null
    }

    const {data, error } = await supabase.from('users').select('*').eq('id', user.id).single()

    if (error) {
        console.log('error getting user data', error)
        return null
    }

    return data ? data : null

}