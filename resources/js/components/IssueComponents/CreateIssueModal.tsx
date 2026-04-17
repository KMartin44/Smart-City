import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/react';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export default function CreateIssueModal({ isOpen, onClose, onCreated }: Props) {
    const { auth } = usePage().props as any;
    const userId = auth?.user?.id;

    const [data, setData] = useState({
        category: '',
        title: '',
        latitude: '',
        longitude: '',
        description: '',
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

        const res = await fetch('/api/issues', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude),
                user_id: userId
            }),
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
                    <DialogTitle>Probléma bejelentése</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Cím */}
                    <div className="space-y-2">
                        <Label>Cím</Label>
                        <Input name="title" value={data.title} onChange={handleChange} required />
                    </div>

                    {/* Kategória */}
                    <div className="space-y-2">
                        <Label>Kategória</Label>
                        <Select
                            onValueChange={(value) =>
                                setData((prev) => ({
                                    ...prev,
                                    category: value as string,
                                }))
                            }
                        >
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
                    </div>

                    {/* Térkép */}
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

                    {/* Leírás */}
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