import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User2, ChevronDown } from "lucide-react"
import { usePage, router } from "@inertiajs/react"

export function MainLayout({ children }) {
    const { auth } = usePage().props
    const user = auth?.user

    const handleLogout = () => {
        router.post('/logout')
    }
    return (
        <div className="min-h-screen flex flex-col">
            <div className="md:hidden">
                <SidebarProvider>
                    <div className="app-mobile-header">
                        <SidebarTrigger className="app-mobile-trigger" />
                        <a href="/" className="app-mobile-brand-link" aria-label="Okos Város home">
                            Okos Város
                        </a>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="app-mobile-account-button" aria-label="Fiók menü megnyitása">
                                <User2 className="h-5 w-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="app-mobile-dropdown-content"
                            >
                                {user ? (
                                    <DropdownMenuItem onClick={handleLogout} className="app-mobile-dropdown-item">
                                        Kijelentkezés
                                    </DropdownMenuItem>
                                ) : (
                                    <div className="app-mobile-dropdown-auth-container">
                                        <DropdownMenuItem onClick={() => window.location.href = '/login'} className="app-mobile-dropdown-item">
                                            Bejelentkezés
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = '/register'} className="app-mobile-dropdown-item">
                                            Regisztráció
                                        </DropdownMenuItem>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <AppSidebar />
                    <main className="flex-1 pt-16">
                        {children}
                    </main>
                </SidebarProvider>
            </div>

            <div className="hidden md:block">
                <AppNavbar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
