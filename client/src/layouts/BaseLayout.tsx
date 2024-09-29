import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { links,Logo,LogoIcon } from "../components/ui/sidebar";

export const BaseLayout: React.FC = () => {


  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            {/* <LogoIcon /> */}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        <Outlet /> {/* Render the child routes here */}
      </div>
    </div>
  );
};

export default BaseLayout;
