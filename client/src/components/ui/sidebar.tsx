"use client";
import { cn } from "@/lib/utils";
import { NavLink,Link,LinkProps } from "react-router-dom";

import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

import {
  LayoutDashboard,
  User,
  Settings,
  Network,
  LogOut,ChevronDown, ChevronRight,
} from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  submenu?: Links[];
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-2 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[250px] flex-shrink-0 bg-white shadow-lg",
          className
        )}
        animate={{
          width: animate ? (open ? "250px" : "60px") : "250px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};


export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};


export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubMenuOpen((prev) => !prev); // Toggle the submenu on arrow click
  };

  return (
    <>
      <NavLink
        to={link.href || "#"}
        className={({ isActive }) =>
          cn(
            "flex items-center justify-start gap-4 py-2 px-3 rounded-lg transition-all duration-200",
            className,
            isActive
              ? "bg-blue-600 text-white border-blue-500 shadow-sm"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
          )
        }
        {...props}
      >
        <div className="flex items-center">
          {link.icon}
          <motion.span
            animate={{
              display: animate ? (open ? "inline-block" : "none") : "inline-block",
              opacity: animate ? (open ? 1 : 0) : 1,
            }}
            className="text-sm font-medium transition-all whitespace-pre ml-2" // Added margin between icon and label
          >
            {link.label}
          </motion.span>
        </div>

        {/* Add arrow icon for submenu toggle */}
        {link.submenu && (
          <button
            className="ml-auto text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-100"
            onClick={toggleSubMenu}
          >
            {isSubMenuOpen ? <ChevronDown /> : <ChevronRight />} {/* Change icon based on state */}
          </button>
        )}
      </NavLink>

      {/* Submenu for 'Master' */}
      {isSubMenuOpen && link.submenu && (
        <motion.div
          className="ml-8 mt-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
        >
          {link.submenu.map((sublink, idx) => (
            <NavLink
              key={idx}
              to={sublink.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-2 px-4 text-sm rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-500 text-white shadow"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                )
              }
            >
              {sublink.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </>
  );
};



// Update your Links type to include the submenu
// type Links = {
//   label: string;
//   href?: string;
//   icon?: React.ReactNode;
//   submenu?: Links[]; // Add submenu property which is an array of Links
// };



export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Master",
    icon: (
      <Network className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    submenu: [
      {
        label: "Vehicle",
        href: "/master/vehicle",
      },
      {
        label: "Driver",
        href: "/master/driver",
      },
      {
        label: "Customers",
        href: "/master/customer",
      },
      {
        label: "Procurement",
        href: "/master/procurement",
      },
    ],
  },
  {
    label: "Logout",
    href: "/logout",
    icon: (
      <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];



export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Fleet
      </motion.span>
    </Link>
  );
};


export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};