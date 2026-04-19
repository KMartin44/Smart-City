import {
    Home,
    TriangleAlert,
    CalendarDays,
    PencilLine,
    ShieldUser,
    MapPinned,
    MessageSquare,
    User2,
    ChevronDown
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePage, router } from '@inertiajs/react';

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

type NavbarPageProps = {
    auth?: {
        user?: {
            first_name?: string;
            type?: string;
        } | null;
    };
};

export function AppNavbar() {
    const currentPath = window.location.pathname;
    const { auth } = usePage<NavbarPageProps>().props;
    const user = auth?.user;
    const isAdmin = (user?.type ?? '').toLowerCase() === 'admin';
    const visibleItems = items.filter((item) => item.url !== '/admin' || isAdmin);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <nav className="app-navbar">
            <div className="app-navbar-inner">
                <div className="app-navbar-row">
                    {/* Brand */}
                    <div className="app-navbar-brand-wrap">
                        <a href="/" aria-label="SmartCity home" className="app-navbar-brand-link">
                            <div className="app-navbar-logo">
                                <Home className="w-4 h-4 text-white" />
                            </div>
                            <div className="app-navbar-brand-text">
                                <span className="app-navbar-brand-title">Smart City</span>
                                <span className="app-navbar-brand-subtitle">Platform</span>
                            </div>
                        </a>
                    </div>

                    {/* Nav */}
                    <div className="app-navbar-links-wrap">
                        <div className="app-navbar-links">
                        {visibleItems.map((item) => {
                            const isActive = currentPath === item.url;
                            return (
                                <Button
                                    key={item.title}
                                    variant="ghost"
                                    onClick={() => window.location.href = item.url}
                                    className={`app-navbar-link ${isActive ? 'app-navbar-link-active' : 'app-navbar-link-inactive'}`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Button>
                            );
                        })}
                        </div>
                    </div>

                    {/* Account */}
                    <div className="app-navbar-account-wrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="app-navbar-account-button">
                                <User2 className="h-4 w-4" />
                                <span className="hidden sm:inline">{user ? user.first_name : 'Fiók'}</span>
                                <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="app-navbar-dropdown-content">
                                {user ? (
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        Kijelentkezés
                                    </DropdownMenuItem>
                                ) : (
                                    <>
                                        <DropdownMenuItem onClick={() => window.location.href = '/login'} className="cursor-pointer">
                                            Bejelentkezés
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = '/register'} className="cursor-pointer">
                                            Regisztráció
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}
