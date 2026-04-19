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

type EventModalPageProps = {
    auth?: {
        user?: {
            id?: number;
        } | null;
    };
};

export default function CreateEventModal({ isOpen, onClose, onCreated }: Props) {
    const { auth } = usePage<EventModalPageProps>().props;
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
            <DialogContent className="community-modal-content">
                <DialogHeader className="community-modal-header">
                    <DialogTitle className="community-modal-title">Esemény hozzáadása</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="community-modal-form">
                    <div className="community-modal-field">
                        <Label className="community-modal-label">Cím</Label>
                        <Input className="community-modal-input" name="title" value={data.title} onChange={handleChange} required />
                    </div>

                    <div className="community-modal-field">
                        <Label className="community-modal-label">Kategória</Label>
                        <Select
                            value={data.category || ''}
                            onValueChange={(value) => {
                                setData((prev) => ({
                                    ...prev,
                                    category: value || '',
                                }));
                            }}
                        >
                            <SelectTrigger className="community-modal-input community-modal-select-trigger">
                                <SelectValue className="community-modal-select-value" placeholder="Válassz kategóriát" />
                            </SelectTrigger>
                            <SelectContent className="community-modal-select-content">
                                <SelectItem className="community-modal-select-item" value="kultura">Kulturális</SelectItem>
                                <SelectItem className="community-modal-select-item" value="kozossegi">Közösségi</SelectItem>
                                <SelectItem className="community-modal-select-item" value="oktatas">Oktatás</SelectItem>
                                <SelectItem className="community-modal-select-item" value="sport">Sport</SelectItem>
                                <SelectItem className="community-modal-select-item" value="csaladi">Családi</SelectItem>
                                <SelectItem className="community-modal-select-item" value="kreativ">Kreatív</SelectItem>
                                <SelectItem className="community-modal-select-item" value="vallasi">Vallási</SelectItem>
                                <SelectItem className="community-modal-select-item" value="onkormanyzati">Önkormányzati</SelectItem>
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

                    <div className="community-modal-split-grid">
                        <div className="community-modal-field">
                            <Label className="community-modal-label">Kezdés</Label>
                            <Input className="community-modal-input" type="datetime-local" name="start_time" value={data.start_time} onChange={handleChange} required />
                        </div>
                        <div className="community-modal-field">
                            <Label className="community-modal-label">Befejezés</Label>
                            <Input className="community-modal-input" type="datetime-local" name="end_time" value={data.end_time} onChange={handleChange} required />
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
