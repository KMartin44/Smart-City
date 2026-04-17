import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export default function CreateEventModal({ isOpen, onClose, onCreated }: Props) {
    const { auth } = usePage().props as any;
    const userId = auth?.user?.id;

    const [data, setData] = useState({
        category: '',
        title: '',
        latitude: '',
        longitude: '',
        description: '',
        start_time: '',
        end_time: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            alert('Be kell jelentkezned, hogy eseményt hozhass létre.');
            return;
        }

        const res = await fetch('/api/events', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, user_id: userId }),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Hiba a létrehozáskor: ${res.status} ${text}`);
        }

        onCreated();
        onClose();
    };

    function LocationPicker() {
        const [position, setPosition] = useState<[number, number]>(
            data.latitude && data.longitude ? [parseFloat(data.latitude), parseFloat(data.longitude)] : [47.4979, 19.0402],
        );

        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                setData((prev) => ({
                    ...prev,
                    latitude: lat.toString(),
                    longitude: lng.toString(),
                }));
            },
        });

        return <Marker position={position} />;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Esemény hozzáadása</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Cím</Label>
                        <Input name="title" value={data.title} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label>Kategória</Label>
                        <Select
                            value={data.category || ''}
                            onValueChange={(value) => {
                                setData((prev) => ({
                                    ...prev,
                                    category: value || '',
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Válassz kategóriát" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kultura">Kulturális</SelectItem>
                                <SelectItem value="kozossegi">Közösségi</SelectItem>
                                <SelectItem value="oktatas">Oktatás</SelectItem>
                                <SelectItem value="sport">Sport</SelectItem>
                                <SelectItem value="csaladi">Családi</SelectItem>
                                <SelectItem value="kreativ">Kreatív</SelectItem>
                                <SelectItem value="vallasi">Vallási</SelectItem>
                                <SelectItem value="onkormanyzati">Önkormányzati</SelectItem>
                                <SelectItem value="egyeb">Egyéb</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Hely kiválasztása</Label>
                        <MapContainer
                            center={data.latitude && data.longitude ? [parseFloat(data.latitude), parseFloat(data.longitude)] : [47.4979, 19.0402]}
                            zoom={13}
                            style={{ height: '200px', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationPicker />
                        </MapContainer>
                        <div className="text-sm text-muted-foreground">
                            Kiválasztott koordináták: {data.latitude || '-'} , {data.longitude || '-'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Kezdés</Label>
                            <Input type="datetime-local" name="start_time" value={data.start_time} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Befejezés</Label>
                            <Input type="datetime-local" name="end_time" value={data.end_time} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Leírás</Label>
                        <Textarea name="description" value={data.description} onChange={handleChange} required />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Mégse
                        </Button>
                        <Button type="submit">Mentés</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}