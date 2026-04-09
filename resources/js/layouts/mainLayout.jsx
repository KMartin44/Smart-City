import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <SidebarProvider>
                <AppSidebar />
                <main className={"flex-1 p-4"}>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
