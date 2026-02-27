import React, { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export default function CreateIssueModal({
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
    });

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/issues", {
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
                <h2>Probléma bejelentése</h2>
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
                        <option value="kozterulet">Közterület és infrastruktúra</option>
                        <option value="kornyezet">Zöldterület és környezetvédelem</option>
                        <option value="koztisztasag">Köztisztaság</option>
                        <option value="kozlekedes">Közlekedés és forgalom</option>
                        <option value="zaj">Zaj rend és együttélés</option>
                        <option value="kozmuvek">Közművek</option>
                        <option value="allat">Állatokkal kapcsolatos ügyek</option>
                        <option value="intezmenyek">Intézmények és szolgáltatások</option>
                        <option value="digitalis">Digitális / ügyintézési problémák</option>
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

                    <div>
                        <button type="submit">Mentés</button>
                        <button type="button" onClick={onClose}>Mégse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}