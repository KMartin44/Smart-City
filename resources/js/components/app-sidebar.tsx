import {
    Home,
    TriangleAlert,
    CalendarDays,
    ClipboardList,
    MapPinned,
    ShieldUser,
    ChevronUp,
    User2,
    LogOut
} from 'lucide-react';

import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Problémabejelentések",
        url: "/issues",
        icon: TriangleAlert,
    },
    {
        title: "Események",
        url: "/events",
        icon: CalendarDays,
    },
    {
        title: "Bejelentések",
        url: "/statements",
        icon: ClipboardList,
    },
    {
        title: "Térkép",
        url: "/map",
        icon: MapPinned,
    },
    {
        title: "Admin",
        url: "/admin",
        icon: ShieldUser,
    }
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    }

    // Filter items based on user permissions
    const visibleItems = items.filter((item) => {
        // Admin items are only visible to admin users
        if (item.title === 'Admin' && user?.type !== 'admin') {
            return false;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => window.location.href = item.url}
                                        className="w-full justify-start gap-2"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <SidebarMenuButton className="w-full justify-start gap-2">
                                    <User2 className="w-4 h-4" />
                                    {user ? user.first_name + ' ' + user.last_name : 'Account'}
                                    <ChevronUp className="ml-auto w-4 h-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="top">
                                {user ? (
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                ) : (
                                    <>
                                        <DropdownMenuItem onClick={() => window.location.href = "/login"}>
                                            Login
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = "/register"}>
                                            Register
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>

                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}