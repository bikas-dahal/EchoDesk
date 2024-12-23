'use server'

import { createClientServer } from "@/supabase/server"

export const updateUserWorkspace = async (userId: string, workspaceId: string) => {
    const supabase = await createClientServer();

    // update user record
    const { data: updateWorkspaceData, error: updateWorkspaceError} = await supabase.rpc('add_workspace_to_user', {
         user_id: userId,
         new_workspace: workspaceId
    })

    return [updateWorkspaceData, updateWorkspaceError]
}