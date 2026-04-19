import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MainLayout } from '@/layouts/mainLayout';
import { router } from '@inertiajs/react';
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
            <div className="admin-page">
                <div className="admin-hero">
                    <div className="admin-hero-inner">
                        <div className="admin-hero-text">
                            <h1 className="admin-hero-title">Szerkesztés</h1>
                            <p className="admin-hero-subtitle">
                                {type === 'event' ? 'Esemény' : type === 'issue' ? 'Problémabejelentés' : 'Közlemény'} #{id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <div className="admin-edit-card">
                        <div className="admin-edit-header">
                            <h2 className="admin-edit-title">Adatok szerkesztése</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="admin-edit-form">
                            <div className="admin-edit-field">
                                <label className="admin-edit-label">Cím</label>
                                <input
                                    className="auth-form-input"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {(type === 'event' || type === 'issue') && (
                                <div className="admin-edit-field">
                                    <label className="admin-edit-label">Kategória</label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData((prev) => ({ ...prev, category: value || undefined }))}
                                    >
                                        <SelectTrigger className="community-modal-select-trigger auth-form-input">
                                            <SelectValue placeholder="Válassz kategóriát">
                                                {categories.find((c) => c.value === data.category)?.label}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="z-[1000]">
                                            {categories.map((c) => (
                                                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {(type === 'event' || type === 'issue') && (
                                <div className="admin-edit-field">
                                    <label className="admin-edit-label">Hely kiválasztása</label>
                                    <div className="admin-edit-map">
                                        <MapContainer center={[47.4979, 19.0402]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                attribution="&copy; OpenStreetMap contributors"
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <LocationPicker setData={setData} data={data} />
                                        </MapContainer>
                                    </div>
                                    {data.latitude && data.longitude && (
                                        <p className="admin-edit-map-hint">
                                            Kiválasztva: {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {type === 'issue' && (
                                <div className="admin-edit-field">
                                    <label className="admin-edit-label">Kész van már?</label>
                                    <Select
                                        value={data.is_done === undefined ? undefined : data.is_done ? '1' : '0'}
                                        onValueChange={(value) => setData((prev) => ({ ...prev, is_done: value === '1' }))}
                                    >
                                        <SelectTrigger className="community-modal-select-trigger auth-form-input">
                                            <SelectValue placeholder="Válassz állapotot">
                                                {doneOptions.find((opt) => opt.value === (data.is_done === undefined ? undefined : data.is_done ? '1' : '0'))?.label}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {doneOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {type === 'event' && (
                                <div className="admin-edit-grid">
                                    <div className="admin-edit-field">
                                        <label className="admin-edit-label">Kezdés</label>
                                        <input
                                            className="auth-form-input"
                                            type="datetime-local"
                                            name="start_time"
                                            value={data.start_time ?? ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="admin-edit-field">
                                        <label className="admin-edit-label">Befejezés</label>
                                        <input
                                            className="auth-form-input"
                                            type="datetime-local"
                                            name="end_time"
                                            value={data.end_time ?? ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="admin-edit-field">
                                <label className="admin-edit-label">Leírás</label>
                                <textarea
                                    className="auth-form-input min-h-28 resize-y"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="admin-edit-footer -mx-6 -mb-6">
                                <button
                                    type="button"
                                    className="admin-type-btn"
                                    onClick={() => router.get('/admin')}
                                >
                                    Mégse
                                </button>
                                <Button type="submit" className="admin-edit-submit">
                                    Mentés
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

