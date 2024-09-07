// server-layout.tsx (Server Component)

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/ui/sidebar";
import { cookies } from "next/headers"; // Can be used in a Server Component

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarState = cookies().get("sidebar:state")?.value === "true";

  return (
    <SidebarLayout defaultOpen={sidebarState}>
      <AppSidebar />
      {children}
    </SidebarLayout>
  );
}
