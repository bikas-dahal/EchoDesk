'use server'

import { createClientServer } from '@/supabase/server';


export const updateChannelMembers = async (
    channelId: string,
    userId: string
  ) => {
    const supabase = await createClientServer();
  
    const { data: updateChannelData, error: updateChannelError } =
      await supabase.rpc('update_channel_members', {
        new_member: userId,
        channel_id: channelId,
      });
  
    return [updateChannelData, updateChannelError];
  };