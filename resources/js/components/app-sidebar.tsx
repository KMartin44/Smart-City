import {
    Home,
    TriangleAlert,
    CalendarDays,
    PencilLine,
    ChartNoAxesCombined,
    ShieldUser,
    MapPinned, ChevronUp, User2
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Problémabejelentés",
        url: "#",
        icon: TriangleAlert,
    },
    {
        title: "Események",
        url: "#",
        icon: CalendarDays,
    },
    {
        title: "Fórum",
        url: "#",
        icon: PencilLine,
    },
    {
        title: "Statisztikák",
        url: "#",
        icon: ChartNoAxesCombined
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
]

export function AppSidebar() {
    return (
        <Sidebar variant={"sidebar"} collapsible={'icon'}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Account
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Login</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Register</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
