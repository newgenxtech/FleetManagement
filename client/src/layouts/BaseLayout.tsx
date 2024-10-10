import React, { useState } from "react";
import { LogoIcon, Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { links, Logo } from "../components/ui/sidebar";

export const BaseLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar animate={true} open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="ml-2">
              {open ? <Logo /> : <LogoIcon />}
            </div>
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
      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900
        w-100 h-full overflow-y-auto overflow-x-hidden
      ">
        <Outlet /> {/* Render the child routes here */}
      </div>
    </div>
  );
};

export default BaseLayout;
