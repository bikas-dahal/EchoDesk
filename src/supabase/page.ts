import { createServerClient, serializeCookieHeader } from "@supabase/ssr"
import type { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"

export const supabaseServerClientPages = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        const serializedCookies = cookiesToSet.map(({ name, value, options }) =>
                            serializeCookieHeader(name, value, options)
                        )
                        res.setHeader('Set-Cookie', serializedCookies)
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch (error) {
                        console.error("Error setting cookies:", error)
                    }
                },
            },
        }
    )

}