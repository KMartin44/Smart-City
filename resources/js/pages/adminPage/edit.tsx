import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/layouts/mainLayout';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

type Type = 'event' | 'issue' | 'statement';

type EditProps = {
    type: Type;
    id: number;
};

type FormData = {
    title: string;
    category?: string;
    latitude?: number;
    longitude?: number;
    description: string;
    is_done?: boolean;
    start_time?: string;
    end_time?: string;
};

function LocationPicker({ setData, data }: any) {
    const position: [number, number] = data.latitude && data.longitude ? [data.latitude, data.longitude] : [47.4979, 19.0402]; // Budapest

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;

            setData((prev: any) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
            }));
        },
    });

    return <Marker position={position} />;
}

export default function Edit({ type, id }: EditProps) {
    const [data, setData] = useState<FormData>({
        title: '',
        description: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: name === 'latitude' || name === 'longitude' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await fetch(`/api/${type}s/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        });

        alert('Mentve');
        window.location.href = `/admin`;
    };

    const doneOptions = [
        { value: '1', label: 'Kész van' },
        { value: '0', label: 'Nincs kész' },
    ];

    const eventCategories = [
        { value: 'kultura', label: 'Kulturális' },
        { value: 'kozossegi', label: 'Közösségi' },
        { value: 'oktatas', label: 'Oktatás' },
        { value: 'sport', label: 'Sport' },
        { value: 'csaladi', label: 'Családi' },
        { value: 'kreativ', label: 'Kreatív' },
        { value: 'vallasi', label: 'Vallási' },
        { value: 'onkormanyzati', label: 'Önkormányzati' },
        { value: 'egyeb', label: 'Egyéb' },
    ];

    const issueCategories = [
        { value: 'kozterulet', label: 'Közterület' },
        { value: 'kornyezet', label: 'Környezet' },
        { value: 'kozlekedes', label: 'Közlekedés' },
        { value: 'zaj', label: 'Zaj' },
        { value: 'kozmuvek', label: 'Közművek' },
        { value: 'allat', label: 'Állatok' },
        { value: 'digitalis', label: 'Digitális' },
        { value: 'egyeb', label: 'Egyéb' },
    ];

    const categories = type === 'event' ? eventCategories : issueCategories;

    return (
        <MainLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Szerkesztés</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label>Cím</Label>
                            <Input name="title" value={data.title} onChange={handleChange} required />
                        </div>

                        {(type === 'event' || type === 'issue') && (
                            <div>
                                <Label>Kategória</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) =>
                                        setData((prev) => ({
                                            ...prev,
                                            category: value || undefined,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Válassz kategóriát">
                                            {categories.find((c) => c.value === data.category)?.label}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent className="z-[1000]">
                                        {categories.map((c) => (
                                            <SelectItem key={c.value} value={c.value}>
                                                {c.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {(type === 'event' || type === 'issue') && (
                            <div className="space-y-2">
                                <Label>Hely kiválasztása</Label>

                                <MapContainer center={[47.4979, 19.0402]} zoom={13} style={{ height: '350px', width: '100%', zIndex: 0 }}>
                                    <TileLayer
                                        attribution="&copy; OpenStreetMap contributors"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <LocationPicker setData={setData} data={data} />
                                </MapContainer>

                                {data.latitude && data.longitude && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Kiválasztva: {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
                                    </p>
                                )}
                            </div>
                        )}

                        {type === 'issue' && (
                            <div>
                                <Label>Kész van már?</Label>
                                <Select
                                    value={data.is_done === undefined ? undefined : data.is_done ? '1' : '0'}
                                    onValueChange={(value) =>
                                        setData((prev) => ({
                                            ...prev,
                                            is_done: value === '1',
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Válassz állapotot">
                                            {
                                                doneOptions.find(
                                                    (opt) => opt.value === (data.is_done === undefined ? undefined : data.is_done ? '1' : '0'),
                                                )?.label
                                            }
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {doneOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {type === 'event' && (
                            <div>
                                <div>
                                    <Label>Kezdés</Label>
                                    <Input type="datetime-local" name="start_time" value={data.start_time ?? ''} onChange={handleChange} required />
                                </div>

                                <div>
                                    <Label>Befejezés</Label>
                                    <Input type="datetime-local" name="end_time" value={data.end_time ?? ''} onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        <div>
                            <Label>Leírás</Label>
                            <Textarea name="description" value={data.description} onChange={handleChange} required />
                        </div>

                        <Button type="submit" className="w-full">
                            Mentés
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
