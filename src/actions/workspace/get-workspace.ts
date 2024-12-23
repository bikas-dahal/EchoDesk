'use server'

import { createClientServer } from "@/supabase/server";

export const getUserWorkspace = async (workspaceIds: string[]) => {
    const supabase = await createClientServer();

    const {data, error} = await supabase.from('workspaces').select('*').in('id', workspaceIds);

    return [data, error]
}

export const getCurrentWorkspace = async (id: string) => {
    const supabase = await createClientServer();

    const {data, error} = await supabase.from('workspaces').select('*').eq('id', id).single();

    return [data, error]
}