import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/auth/get-user-data';
import { Workspace as UserWorkspace } from '@/types/app';
import {
  getCurrentWorkspace,
  getUserWorkspace,
} from '@/actions/workspace/get-workspace';
import { getUserWorkspaceChannels } from '@/actions/workspace/get-user-workspace-channels';
import ChatGroup from '@/components/chat-group';

const ChannelId = async ({
  params: { channelId, workspaceId },
}: {
  params: {
    workspaceId: string;
    channelId: string;
  };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspace(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspace(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    channel => channel.id === channelId
  );

  if (!currentChannelData) return redirect('/');

  return (
    <div className='hidden md:block'>
      <ChatGroup
        type='Channel'
        userData={userData}
        currentChannelData={currentChannelData}
        currentWorkspaceData={currentWorkspaceData}
        slug={workspaceId}
        chatId={channelId}
        userWorkspaceChannels={userWorkspaceChannels}
        socketUrl='/api/web-socket/messages'
        socketQuery={{
          channelId: currentChannelData.id,
          workspaceId: currentWorkspaceData,
        }}
        apiUrl='/api/messages'
        headerTitle={currentChannelData.name}
        paramKey='channelId'
        paramValue={channelId}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
      />
    </div>
  );
};

export default ChannelId;