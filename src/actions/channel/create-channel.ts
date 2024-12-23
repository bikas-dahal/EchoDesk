'use server';

import { createClientServer } from '@/supabase/server';
import { getUserData } from '../auth/get-user-data';
import { updateChannelMembers } from './update-channel-members';

export const createChannel = async ({
  name,
  workspaceId,
  userId,
}: {
  workspaceId: string;
  name: string;
  userId: string;
}) => {
  const supabase = await createClientServer();
  const userData = await getUserData();

  if (!userData) {
    return { error: 'No user data' };
  }

  const { error, data: channelRecord } = await supabase
    .from('channels')
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select('*');

  if (error) {
    return { error: 'Insert Error' };
  }

  //   Update channel members array
  const [, updateChannelMembersError] = await updateChannelMembers(
    channelRecord[0].id,
    userId
  );

  if (updateChannelMembersError) {
    return { error: 'Update members channel error' };
  }

  //   Add channel to user's channels array
  const [, addChannelToUserError] = await addChannelToUser(
    userData.id,
    channelRecord[0].id
  );

  if (addChannelToUserError) {
    return { error: 'Add channel to user error' };
  }

  //   Add channel to workspace's channels array
  const [, updateWorkspaceChannelError] = await updateWorkspaceChannel(
    channelRecord[0].id,
    workspaceId
  );

  if (updateWorkspaceChannelError) {
    return { error: 'Update workspace channel error' };
  }
};


export const addChannelToUser = async (userId: string, channelId: string) => {
    const supabase = await createClientServer();
  
    const { data: addChannelData, error: addChannelError } = await supabase.rpc(
      'update_user_channels',
      {
        user_id: userId,
        channel_id: channelId,
      }
    );
  
    return [addChannelData, addChannelError];
  };


  const updateWorkspaceChannel = async (
    channelId: string,
    workspaceId: string
  ) => {
    const supabase = await createClientServer();
  
    const { data: updateWorkspaceData, error: updateWorkspaceError } =
      await supabase.rpc('add_channel_to_workspace', {
        channel_id: channelId,
        workspace_id: workspaceId,
      });
  
    return [updateWorkspaceData, updateWorkspaceError];
  };