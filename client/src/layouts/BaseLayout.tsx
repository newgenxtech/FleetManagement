import React, { useState, useCallback } from "react";
import { LogoIcon, Sidebar, SidebarBody, SidebarLink, links, Logo } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";

const BaseLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar animate={true} open={open} setOpen={toggleSidebar}>
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
          </div>
          <div>
            <SidebarLink
              link={{
                label: "John Doe",
                href: "#",
                icon: (
                  <img
                    src="https://avatars.githubusercontent.com/u/1659798?v=4"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 w-100 h-full overflow-y-auto overflow-x-hidden">
        <Outlet /> {/* Render the child routes here */}
      </div>
    </div>
  );
};

export default React.memo(BaseLayout);
