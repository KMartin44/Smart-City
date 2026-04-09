import CreateEventModal from '@/components/EventComponents/CreateEventModal';
import { MainLayout } from '@/layouts/mainLayout';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

type Event = {
    id: number;
    category: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    start_time: string;
    end_time: string;
    user_id: number;
};

const categoryLabels: Record<string, string> = {
    kultura: 'Kulturális események',
    kozossegi: 'Közösségi és civil események',
    oktatas: 'Oktatás és ismeretterjesztés',
    sport: 'Sport és szabadidő',
    csaladi: 'Gyermek- és családi programok',
    kreativ: 'Kreatív és kézműves',
    vallasi: 'Vallási események',
    onkormanyzati: 'Önkormányzati és hivatalos események',
    egyeb: 'Egyéb',
};

export default function EventsPage() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);

    const fetchEvents = async () => {
        const res = await fetch('/api/events', {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });
        const data = await res.json();
        setEvents(data);
    };

    // Lekéri a CSRF cookie-t
    const ensureCsrfCookie = async () => {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });
    };

    const getXsrfToken = () => {
        const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
        return match ? decodeURIComponent(match[1]) : '';
    };

    const deleteEvent = async (id: number) => {
        if (!confirm('Biztosan törölni szeretnéd ezt az eseményt?')) return;

        await ensureCsrfCookie();

        await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'X-XSRF-TOKEN': getXsrfToken(),
            },
        });

        fetchEvents();
    };

    const canDeleteEvent = (event: Event) => {
        return user && (user.type === 'admin' || user.id === event.user_id);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Események</h1>

                    <Button onClick={() => setShowModal(true)}>Esemény hozzáadása</Button>
                </div>

                <CreateEventModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onCreated={fetchEvents}
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{event.title}</CardTitle>
                                    {canDeleteEvent(event) && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteEvent(event.id)}
                                        >
                                            Törlés
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="text-sm text-muted-foreground">
                                    {categoryLabels[event.category] || event.category}
                                </div>

                                <p>{event.description}</p>

                                <div className="text-sm">
                                    <strong>Koordináták:</strong> {Number(event.latitude).toFixed(4)}° N,{' '}
                                    {Number(event.longitude).toFixed(4)}° E
                                </div>

                                <div className="text-sm">
                                    {new Date(event.start_time).toLocaleString()} -{' '}
                                    {new Date(event.end_time).toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}