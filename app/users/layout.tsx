import { PropsWithChildren, ReactNode } from "react";
import SideBar from "@/app/components/sideBar/SideBar";

export default async function UsersLayout({
  children,
}: PropsWithChildren<ReactNode>) {
  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className={"h-full"}>{children}</div>
    </SideBar>
  );
}
