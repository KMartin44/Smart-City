import React, { useEffect, useState, ReactNode } from "react";
import { MainLayout } from '@/layouts/mainLayout';
import CreateEventModal from "@/components/EventComponents/CreateEventModal";


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

    const fetchEvents = async () => {
        await fetch("api/events").then((res) => res.json()).then((data) => setEvents(data));
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Események</h1>
            <button onClick={() => setShowModal(true)}>
                Esemény hozzáadása
            </button>
            <CreateEventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={fetchEvents}
            />
            <div>
                {events.map((event) => (
                    <div key={event.id} className="eventCard">
                        <h2>{event.title}</h2>
                        <h5>{event.category}</h5>
                        <p>{event.description}</p>
                        <p>Koordináták: {Number(event.latitude).toFixed(4)}° N, {Number(event.longitude).toFixed(4)}° E</p>
                        <p>{event.start_time.toString()} - {event.end_time.toString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

EventsPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);