import CreateEventModal from '@/components/EventComponents/CreateEventModal';
import { MainLayout } from '@/layouts/mainLayout';
import { ReactNode, useEffect, useState } from 'react';

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

    useEffect(() => {
        fetchEvents();
    }, []);

    const canDeleteEvent = (event: Event) => {
        return user && (user.type === 'admin' || user.id === event.user_id);
    };

    return (
        <div className="community-feed-page">
            <section className="community-feed-hero">
                <div className="community-feed-hero-inner">
                    <div className="community-feed-hero-content">
                        <h1 className="community-feed-hero-title">Események</h1>
                        <p className="community-feed-hero-copy">
                            Fedezd fel a város eseményeit egy egységes, áttekinthető felületen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="community-feed-section">
                <div className="community-feed-section-inner">
                    <div className="community-feed-toolbar">
                        <div>
                            <h2 className="community-feed-toolbar-title">Közelgő események</h2>
                            <p className="community-feed-toolbar-copy">
                                Kategóriák, leírások, időpontok és helyszínek egy helyen.
                            </p>
                        </div>
                        <Button variant="outline" className="community-feed-primary-button" onClick={() => setShowModal(true)}>
                            Esemény hozzáadása
                        </Button>
                    </div>

                    <CreateEventModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onCreated={fetchEvents}
                    />

                    <div className="community-feed-grid">
                        {events.map((event) => (
                            <Card key={event.id} className="community-feed-card">
                                <CardHeader className="community-feed-card-header">
                                    <div className="community-feed-card-title-row">
                                        <CardTitle className="community-feed-card-title">{event.title}</CardTitle>
                                        {canDeleteEvent(event) && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {}}
                                                className="community-feed-card-delete-button"
                                            >
                                                Törlés
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="community-feed-card-content">
                                    <div className="community-feed-card-badge">
                                        {categoryLabels[event.category] || event.category}
                                    </div>

                                    <p className="community-feed-card-description">{event.description}</p>

                                    <div className="community-feed-card-detail">
                                        Koordináták: {Number(event.latitude).toFixed(4)}° N, {Number(event.longitude).toFixed(4)}° E
                                    </div>

                                    <div className="community-feed-card-detail">
                                        {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

EventsPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
