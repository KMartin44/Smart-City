import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
                user_id : 1,
            }),
        });
        onCreated();
        onClose();
    };

    return (
        <div>
            <div>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Input placeholder="Cím" value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                } required />
                            <Select
                                value={form.category}
                                onValueChange={(value: string) => setForm({ ...form, category: value })}
                                required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Válassz kategóriát" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kultura">Kulturális események</SelectItem>
                                    <SelectItem value="kozossegi">Közösségi és civil események</SelectItem>
                                    <SelectItem value="oktatas">Oktatás és ismeretterjesztés</SelectItem>
                                    <SelectItem value="sport">Sport és szabadidő</SelectItem>
                                    <SelectItem value="csaladi">Gyermek- és családi programok</SelectItem>
                                    <SelectItem value="kreativ">Kreatív és kézműves</SelectItem>
                                    <SelectItem value="vallasi">Vallási események</SelectItem>
                                    <SelectItem value="onkormanyzati">Önkormányzati és hivatalos események</SelectItem>
                                    <SelectItem value="egyeb">Egyéb</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input type="number" placeholder="Szélesség" value={form.latitude}
                                onChange={(e) =>
                                    setForm({ ...form, latitude: e.target.value })
                                } required />

                            <Input type="number" placeholder="Hosszúság" value={form.longitude}
                                onChange={(e) =>
                                    setForm({ ...form, longitude: e.target.value })
                                } required />
                            <Textarea placeholder="Leírás" value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                } required />
                            <Input type="datetime-local" placeholder="Kezdés időpontja" value={form.start_time}
                                onChange={(e) =>
                                    setForm({ ...form, start_time: e.target.value })
                                } required />
                            <Input type="datetime-local" placeholder="Befejezés időpontja" value={form.end_time}
                                onChange={(e) =>
                                    setForm({ ...form, end_time: e.target.value })
                                } required />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Mentés</Button>
                            <Button type="button" variant="destructive" onClick={onClose}>
                                Mégse
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}