"use client";
import { cn } from "@/lib/utils";
import { NavLink, Link, LinkProps } from "react-router-dom";

import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import FleetAppIcon from "@/assets/Fleet Management Logo.png";
import {
  LayoutDashboard,
  User,
  Settings,
  Network,
  ChevronDown, ChevronRight,
} from "lucide-react";



export type Links = {
  label: string | React.ReactNode;
  href: string;
  icon: JSX.Element;
  submenu?: undefined;
} | {
  label: string;
  icon: JSX.Element;
  href?: string;
  submenu: {
    label: string;
    href: string;
    icon?: JSX.Element;
    submenu?: Links[];
  }[];
};


interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  selectedItem?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
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
  selectedItem,
  setSelectedItem,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  selectedItem?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{
      open, setOpen, animate: animate, selectedItem, setSelectedItem
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
  selectedItem,
  setSelectedItem,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  selectedItem?: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate} selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
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
          // "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[250px] flex-shrink-0 shadow-lg",
          `h-full px-2 py-4 hidden  md:flex md:flex-col bg-[#23321D] dark:bg-neutral-800 w-[300px] flex-shrink-0
          `,

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

  useEffect(() => {
    if (!open) {
      setIsSubMenuOpen(false); // Close the submenu when sidebar is closed
    } else {
      setIsSubMenuOpen(true);
    }
  }, [open]);



  return (
    <>
      <NavLink
        to={link.href || "#"}
        className={({ isActive }) =>
          cn(
            "flex items-center justify-start gap-4 py-2 px-2 rounded-lg transition-all duration-200",
            className,
            isActive
              ? `bg-[#2F4829] text-white shadow 
                
              ` :
              "text-white dark:text-neutral-200 hover:bg-[#2F4829] dark:hover:bg-neutral-700"
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
                    ? `bg-[#2F4829] text-white shadow `
                    :
                    "text-white dark:text-neutral-300 hover:bg-[#2F4829] dark:hover:bg-neutral-700"
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





export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <User className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Settings className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Master",
    icon: (
      <Network className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
  // {
  //   label: "Logout",
  //   href: "/logout",
  //   icon: (
  //     <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
  //   ),
  // },
];



export const Logo = () => (
  <Link
    to="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <img src={FleetAppIcon} className="h-11 w-11" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold text-white dark:text-black whitespace-pre text-lg
      "
    >
      Fleet Management
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link
    to="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <img src={FleetAppIcon} className="h-11 w-11" />
  </Link>
);
