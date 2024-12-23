import { getUserData } from "@/actions/auth/get-user-data";

import { redirect } from "next/navigation";

export default async function Home() {

  const userData = await getUserData()

  console.log('userdata', userData)

  if (!userData) {
    return redirect('/auth/login')
  }

  const userWorkspaceId = userData?.workspaces?.[0]


  // console.log('userWorkspaceId', userWorkspaceId)

  if (!userWorkspaceId) return redirect('/create-workspace')

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`)

 
}
