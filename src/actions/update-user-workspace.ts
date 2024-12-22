'use server'

import { createClientServer } from "@/supabase/server"

const updateUserWorkspace = async (userId: string, workspaceId: string) => {
    const supabase = await createClientServer();

    // update user record
    const {} = await supabase.rpc('add_workspace_to_user', {
         
    })
}