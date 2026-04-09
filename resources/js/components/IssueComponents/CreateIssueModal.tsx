import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent,  SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
                user_id :1,
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
                                    <SelectItem value="kozterulet">Közterület és infrastruktúra</SelectItem>
                                    <SelectItem value="kornyezet">Zöldterület és környezetvédelem</SelectItem>
                                    <SelectItem value="koztisztasag">Köztisztaság</SelectItem>
                                    <SelectItem value="kozlekedes">Közlekedés és forgalom</SelectItem>
                                    <SelectItem value="zaj">Zaj rend és együttélés</SelectItem>
                                    <SelectItem value="kozmuvek">Közművek</SelectItem>
                                    <SelectItem value="allat">Állatokkal kapcsolatos ügyek</SelectItem>
                                    <SelectItem value="intezmenyek">Intézmények és szolgáltatások</SelectItem>
                                    <SelectItem value="digitalis">Digitális / ügyintézési problémák</SelectItem>
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