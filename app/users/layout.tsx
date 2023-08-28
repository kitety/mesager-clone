import { PropsWithChildren, ReactNode } from "react";
import SideBar from "@/app/components/sideBar/SideBar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";

export default async function UsersLayout({
  children,
}: PropsWithChildren<ReactNode>) {
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className={"h-full"}>
        <UserList users={users} />
        {children}
      </div>
    </SideBar>
  );
}
