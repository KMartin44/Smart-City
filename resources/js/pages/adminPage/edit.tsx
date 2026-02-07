import { ChangeEvent, FormEvent, useState } from 'react';

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
    start_time?: string;
    end_time?: string;
};

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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cím</label>
                <input name="title" value={data.title} onChange={handleChange} required />
            </div>

            {(type === 'event' || type === 'issue') && (
                <div>
                    <label>Kategória</label>
                    <select name="category" value={data.category ?? ''} onChange={handleChange} required>
                        <option value="">Válassz kategóriát</option>

                        {type === 'event' && (
                            <>
                                <option value="kultura">Kulturális</option>
                                <option value="kozossegi">Közösségi</option>
                                <option value="oktatas">Oktatási</option>
                                <option value="sport">Sport</option>
                                <option value="csaladi">Családi</option>
                                <option value="kreativ">Kreatív</option>
                                <option value="vallasi">Vallási</option>
                                <option value="onkormanyzati">Önkormányzati</option>
                                <option value="egyeb">Egyéb</option>
                            </>
                        )}

                        {type === 'issue' && (
                            <>
                                <option value="kozterulet">Közterület</option>
                                <option value="kornyezet">Környezet</option>
                                <option value="kozlekedes">Közlekedés</option>
                                <option value="zaj">Zaj</option>
                                <option value="kozmuvek">Közművek</option>
                                <option value="allat">Állatok</option>
                                <option value="digitalis">Digitális</option>
                                <option value="egyeb">Egyéb</option>
                            </>
                        )}
                    </select>
                </div>
            )}

            {(type === 'event' || type === 'issue') && (
                <>
                    <div>
                        <label>Szélesség</label>
                        <input type="number" step="0.00000001" name="latitude" value={data.latitude ?? ''} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Hosszúság</label>
                        <input type="number" step="0.00000001" name="longitude" value={data.longitude ?? ''} onChange={handleChange} required />
                    </div>
                </>
            )}

            {type === 'event' && (
                <>
                    <div>
                        <label>Kezdés</label>
                        <input type="datetime-local" name="start_time" value={data.start_time ?? ''} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Befejezés</label>
                        <input type="datetime-local" name="end_time" value={data.end_time ?? ''} onChange={handleChange} required />
                    </div>
                </>
            )}

            <div>
                <label>Leírás</label>
                <textarea name="description" value={data.description} onChange={handleChange} required />
            </div>

            <button type="submit">Mentés</button>
        </form>
    );
}
