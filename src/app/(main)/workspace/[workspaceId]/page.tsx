import { redirect } from 'next/navigation';

import { getUserData } from '@/actions/auth/get-user-data';
import {
  getCurrentWorkspace,
  getUserWorkspace,
} from '@/actions/workspace/get-workspace';
import Sidebar from '@/components/sidebar';
import { Workspace as UserWorkspace } from '@/types/app';
import InfoSection from '@/components/info-section';
import { getUserWorkspaceChannels } from '@/actions/workspace/get-user-workspace-channels';
import NoDataScreen from '@/components/no-data-component';

const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspace(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspace(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  // if (userWorkspaceChannels.length) {
  //   redirect(
  //     `/workspace/${workspaceId}/channels/${userWorkspaceChannels[0].id}`
  //   );
  // }

  return (
    <>
      <div className='hidden md:block'>
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorksapcesData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId=''
        />

        <NoDataScreen
          userId={userData.id}
          workspaceId={currentWorkspaceData.id}
          workspaceName={currentWorkspaceData.name}
        />
      </div>
      <div className='md:hidden block min-h-screen'>Mobile</div>
    </>
  );
};

export default Workspace;