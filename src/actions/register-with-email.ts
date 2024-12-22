'use server'

import { createClientServer } from "@/supabase/server";

export async function registerWithEmail({ email }: { email: string }) {
    console.log(email);

    const supabase = await createClientServer();


    const response = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_CURRENT_ORIGIN
        }
    })

    return JSON.stringify(response);
}
  