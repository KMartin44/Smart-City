import {
    Home,
    TriangleAlert,
    CalendarDays,
    PencilLine,
    ShieldUser,
    MapPinned,
    MessageSquare,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

type SidebarPageProps = {
    auth?: {
        user?: {
            type?: string;
        } | null;
    };
};

const items = [
    {
        title: "Problémabejelentés",
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
        icon: PencilLine,
    },
    {
        title: "Térkép",
        url: "/map",
        icon: MapPinned,
    },
    {
        title: "Chat",
        url: "/chat",
        icon: MessageSquare,
    },
    {
        title: "Admin",
        url: "/admin",
        icon: ShieldUser,
    }
]

export function AppSidebar() {
    const { auth } = usePage<SidebarPageProps>().props;
    const user = auth?.user;
    const isAdmin = (user?.type ?? '').toLowerCase() === 'admin';
    const visibleItems = items.filter((item) => item.url !== '/admin' || isAdmin);

    return (
        <Sidebar variant={"sidebar"} collapsible={'icon'} className="app-sidebar">
            <SidebarHeader className="app-sidebar-header">
                <a href="/" className="app-sidebar-brand-link">
                    <div className="app-sidebar-logo">
                        <Home className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="app-sidebar-title">Okos Város</span>
                        <span className="app-sidebar-subtitle">Platform</span>
                    </div>
                </a>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="app-sidebar-menu">
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title} className="app-sidebar-menu-item">
                                    <SidebarMenuButton
                                        onClick={() => window.location.href = item.url}
                                        className="app-sidebar-menu-button"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="app-sidebar-footer" />
        </Sidebar>
    )
}
