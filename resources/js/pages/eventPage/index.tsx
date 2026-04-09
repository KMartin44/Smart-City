import React, { useEffect, useState, ReactNode } from "react";
import { MainLayout } from '@/layouts/mainLayout';
import CreateEventModal from "@/components/EventComponents/CreateEventModal";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


type Event = {
    id: number;
    category: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    start_time: Date;
    end_time: Date;
};


export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
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
    const fetchEvents = async () => {
        await fetch("api/events").then((res) => res.json()).then((data) => setEvents(data));
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Események</h1>
            <Button onClick={() => setShowModal(true)}>
                Esemény hozzáadása
            </Button>
            <CreateEventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={fetchEvents}
            />
            <div>
                {events.map((event) => (
                    <Card key={event.id} className="eventCard">
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                        <p>{categoryLabels[event.category] || event.category}</p>
                        <p><span className="bigger">Koordináták:</span> {Number(event.latitude).toFixed(4)}° N, {Number(event.longitude).toFixed(4)}° E</p>
                        <p>{event.start_time.toString()} - {event.end_time.toString()}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

EventsPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);