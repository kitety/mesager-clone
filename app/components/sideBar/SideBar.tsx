import { PropsWithChildren, ReactNode } from "react";
import DesktopSidebar from "@/app/components/sideBar/DesktopSidebar";
import MobileFooter from "@/app/components/sideBar/MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

const SideBar = async ({ children }: PropsWithChildren<ReactNode>) => {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className={"lg:pl-20 h-full"}>{children}</main>
    </div>
  );
};
export default SideBar;
