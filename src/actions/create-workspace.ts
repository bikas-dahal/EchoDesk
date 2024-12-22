'use server'

import { createClientServer } from "@/supabase/server";
import { getUserData } from "./get-user-data";

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
            insertError: 'Error creating workspace'
        };
    }

    const [] = await updateUserWorkspace(userData.id, workspaceRecord[0]?.id);


}