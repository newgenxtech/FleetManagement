import React, { useState, useCallback, useMemo } from "react";
import { LogoIcon, Sidebar, SidebarBody, SidebarLink, links, Logo } from "../components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface UserProfileProps {
  handleLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = React.memo((
  {
    handleLogout
  }: UserProfileProps

) => (
  <SidebarLink
    link={{
      label: (
        <div className="flex justify-between items-center gap-4 w-44">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">John Doe</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
          <div>
            <LogOut onClick={handleLogout} />
          </div>
        </div>
      ),
      href: "",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/1659798?v=4"
          className="h-7 w-7 flex-shrink-0 rounded-full my-2"
          width={50}
          height={50}
          alt="Avatar"
        />
      ),
    }}
  />
  // <div className="flex justify-between items-center gap-4 w-44 p-2 border rounded-md">
  //   <div className="flex flex-col">
  //     <span className="text-sm font-semibold">John Doe</span>
  //     <span className="text-xs text-gray-500">Admin</span>
  //   </div>
  //   <div className="flex items-center gap-2">
  //     <img
  //       src="https://avatars.githubusercontent.com/u/1659798?v=4"
  //       className="h-7 w-7 flex-shrink-0 rounded-full"
  //       width={50}
  //       height={50}
  //       alt="Avatar"
  //     />
  //     <LogOut onClick={handleLogout} />
  //   </div>
  // </div>

));

const BaseLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const memoizedLinks = useMemo(() => links, []);

  const handleLogout = () => {
    // Perform logout action here
    navigate("/auth/login");
  }

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar animate={true} open={open} setOpen={toggleSidebar}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div>
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {memoizedLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <UserProfile
              handleLogout={handleLogout}
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