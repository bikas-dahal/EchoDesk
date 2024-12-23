'use server'

import { createClientServer } from "@/supabase/server";

export const addMemberToWorkspace = async (userId: string, workspaceId: string) => {
     const supabase = await createClientServer();

     // update workspace member
     const {data: addMemberToWorkspaceData, error: addMemberToWorkspaceError} = await supabase.rpc('add_member_to_workspace', {
            user_id: userId,
            workspace_id: workspaceId
        })

    
    return [addMemberToWorkspaceData, addMemberToWorkspaceError]
}