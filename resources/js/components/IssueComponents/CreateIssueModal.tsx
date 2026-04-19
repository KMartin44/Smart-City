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

        if (!data.category) {
            alert('Válassz kategóriát.');
            return;
        }

        const latitude = Number(data.latitude);
        const longitude = Number(data.longitude);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            alert('Kattints a térképre a helyszín kiválasztásához.');
            return;
        }

        const res = await fetch('/api/issues', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                latitude,
                longitude,
            }),
        });

        if (!res.ok) {
            const payload = await res.json().catch(() => null);
            const validationMessage = payload?.errors
                ? Object.values(payload.errors).flat()[0]
                : null;
            alert(validationMessage || payload?.message || 'Hiba történt a probléma létrehozásakor.');
            return;
        }

        onCreated();
        onClose();
        setData({
            category: '',
            title: '',
            latitude: '',
            longitude: '',
            description: '',
        });
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
            <DialogContent className="community-modal-content">
                <DialogHeader className="community-modal-header">
                    <DialogTitle className="community-modal-title">Probléma bejelentése</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="community-modal-form">
                    <div className="community-modal-field">
                        <Label className="community-modal-label">Cím</Label>
                        <Input className="community-modal-input" name="title" value={data.title} onChange={handleChange} required />
                    </div>

                    <div className="community-modal-field">
                        <Label className="community-modal-label">Kategória</Label>
                        <Select
                            value={data.category || undefined}
                            onValueChange={(value) =>
                                setData((prev) => ({
                                    ...prev,
                                    category: value || '',
                                }))
                            }
                        >
                            <SelectTrigger className="community-modal-input community-modal-select-trigger">
                                <SelectValue className="community-modal-select-value" placeholder="Válassz kategóriát" />
                            </SelectTrigger>

                            <SelectContent className="community-modal-select-content">
                                <SelectItem className="community-modal-select-item" value="kozterulet">Közterület és infrastruktúra</SelectItem>
                                <SelectItem className="community-modal-select-item" value="kornyezet">Zöldterület és környezetvédelem</SelectItem>
                                <SelectItem className="community-modal-select-item" value="koztisztasag">Köztisztaság</SelectItem>
                                <SelectItem className="community-modal-select-item" value="kozlekedes">Közlekedés és forgalom</SelectItem>
                                <SelectItem className="community-modal-select-item" value="zaj">Zaj rend és együttélés</SelectItem>
                                <SelectItem className="community-modal-select-item" value="kozmuvek">Közművek</SelectItem>
                                <SelectItem className="community-modal-select-item" value="allat">Állatokkal kapcsolatos ügyek</SelectItem>
                                <SelectItem className="community-modal-select-item" value="intezmenyek">Intézmények és szolgáltatások</SelectItem>
                                <SelectItem className="community-modal-select-item" value="digitalis">Digitális / ügyintézési problémák</SelectItem>
                                <SelectItem className="community-modal-select-item" value="egyeb">Egyéb</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="community-modal-field">
                        <Label className="community-modal-label">Hely kiválasztása</Label>
                        <MapContainer
                            className="community-modal-map"
                            center={data.latitude && data.longitude ? [parseFloat(data.latitude), parseFloat(data.longitude)] : [47.4979, 19.0402]}
                            zoom={13}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationPicker />
                        </MapContainer>

                        <div className="community-modal-helper-text">
                            Kiválasztott koordináták: {data.latitude || '-'} , {data.longitude || '-'}
                        </div>
                    </div>

                    <div className="community-modal-field">
                        <Label className="community-modal-label">Leírás</Label>
                        <Textarea className="community-modal-textarea" name="description" value={data.description} onChange={handleChange} required />
                    </div>

                    <DialogFooter className="community-modal-footer">
                        <Button type="button" variant="outline" onClick={onClose} className="community-modal-secondary-button">
                            Mégse
                        </Button>
                        <Button type="submit" variant="outline" className="community-modal-primary-button">Mentés</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
