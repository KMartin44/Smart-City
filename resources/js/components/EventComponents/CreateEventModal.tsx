import React, { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export default function CreateEventModal({
    isOpen,
    onClose,
    onCreated,
}: Props) {
    const [form, setForm] = useState({
        category: "",
        title: "",
        latitude: "",
        longitude: "",
        description: "",
        start_time: "",
        end_time: "",
    });

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
                latitude: parseFloat(form.latitude),
                longitude: parseFloat(form.longitude),
            }),
        });

        onCreated();
        onClose();
    };

    return (
        <div>
            <div>
                <h2>Esemény hozzáadása</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Cím" value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        } required />
                    <select
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        } required defaultValue={""}>
                        <option value="" disabled>Válassz kategóriát</option>
                        <option value="kultura">Kulturális események</option>
                        <option value="kozossegi">Közösségi és civil események</option>
                        <option value="oktatas">Oktatás és ismeretterjesztés</option>
                        <option value="sport">Sport és szabadidő</option>
                        <option value="csaladi">Gyermek- és családi programok</option>
                        <option value="kreativ">Kreatív és kézműves</option>
                        <option value="vallasi">Vallási események</option>
                        <option value="onkormanyzati">Önkormányzati és hivatalos események</option>
                        <option value="egyeb">Egyéb</option>
                    </select>
                    <input type="number" placeholder="Szélesség" value={form.latitude}
                        onChange={(e) =>
                            setForm({ ...form, latitude: e.target.value })
                        } required />

                    <input type="number" placeholder="Hosszúság" value={form.longitude}
                        onChange={(e) =>
                            setForm({ ...form, longitude: e.target.value })
                        } required />

                    <textarea placeholder="Leírás" value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        } required />
                    <input type="date" placeholder="Kezdés időpontja" value={form.start_time}
                        onChange={(e) =>
                            setForm({ ...form, start_time: e.target.value })
                        } required />
                    <input type="date" placeholder="Befejezés időpontja" value={form.end_time}
                        onChange={(e) =>
                            setForm({ ...form, end_time: e.target.value })
                        } required />
                    <div>
                        <button type="submit">Mentés</button>
                        <button type="button" onClick={onClose}>Mégse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}