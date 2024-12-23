'use server'

import { createClientServer } from "@/supabase/server";
import { getUserData } from "../auth/get-user-data";
import { updateUserWorkspace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

export const createWorkspace = async ({
    name,
    imageUrl,
    invite_code,
    slug
}: {
    name: string;
    imageUrl?: string;
    invite_code: string;
    slug: string;
}) => {
    const supabase = await createClientServer();
    const userData = await getUserData();

    if (!userData) {
        return {
            error: 'No user found'
        };
    }

    const {error, data: workspaceRecord} = await supabase.from('workspaces').insert({
        image_url: imageUrl,
        name,
        super_admin: userData.id,
        slug,
        invite_code
    }).select('*');

    if (error) {
        console.log('error', error);
        return {
            error: 'Error creating workspace'
        };
    }

    const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(userData.id, workspaceRecord[0]?.id);

    if (updateWorkspaceError) {
        return {
            error: 'Error updating user workspace'
        };
    } 

    // add user to workspace member
    const [addMemberToWorkspaceData, addMemberToWorkspaceError] = await addMemberToWorkspace(userData.id, workspaceRecord[0]?.id);


    if (addMemberToWorkspaceError) {
        return {
            error: 'Error adding user to workspace'
        };
    }



}