import "@/index.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout(
    //     {
    //     children,
    // }: Readonly<{
    //     children: React.ReactNode;
    // }>
) {
    const sidebarOpen = true;


    return (
        <html lang="en">
            <body
                // font-geist-sans  //! this font can also be used
                className="font-geist-mono antialiased bg-white"
            >
                <SidebarLayout
                    defaultOpen={
                        // if route is login or forgot password or sign up
                        // then render the children
                        // else render the sidebar layout
                        sidebarOpen
                    }
                >
                    <AppSidebar />
                    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
                        <div className="h-full">
                            <SidebarTrigger />
                            {/* {children} */}
                            <Outlet />
                        </div>
                    </main>
                </SidebarLayout>
                {/* )} */}
            </body>
        </html>
    );
}
