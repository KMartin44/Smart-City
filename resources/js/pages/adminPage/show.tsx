import { MainLayout } from '@/layouts/mainLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Type = 'event' | 'issue' | 'statement';

type ShowProps = {
    type: Type;
    id: number;
};

type Item = {
    id: number;
    title: string;
    description: string;
    category?: string;
    latitude?: number;
    longitude?: number;
    is_done?: boolean;
    start_time?: string;
    end_time?: string;
    created_at: string;
    updated_at: string;
};

const typeLabel = (type: Type) => {
    if (type === 'event') return 'Esemény';
    if (type === 'issue') return 'Problémabejelentés';
    return 'Közlemény';
};

export default function Show({ type, id }: ShowProps) {
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        let url = '';
        if (type === 'event') url = `/api/events/${id}`;
        else if (type === 'issue') url = `/api/issues/${id}`;
        else url = `/api/statements/${id}`;

        fetch(url, { headers: { Accept: 'application/json' } })
            .then((res) => res.json())
            .then((response) => setItem(response.data));
    }, [type, id]);

    if (!item) {
        return (
            <MainLayout>
                <div className="admin-page">
                    <div className="admin-section">
                        <p className="text-sm text-gray-400">Betöltés...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="admin-page">
                <div className="admin-hero">
                    <div className="admin-hero-inner">
                        <div className="admin-hero-text">
                            <h1 className="admin-hero-title">{typeLabel(type)} részletek</h1>
                            <p className="admin-hero-subtitle">#{item.id} — {item.title}</p>
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <div className="admin-detail-card">
                        <div className="admin-detail-header">
                            <span className="admin-detail-title">{item.title}</span>
                            <button className="admin-detail-back" onClick={() => router.get('/admin')}>
                                ← Vissza
                            </button>
                        </div>

                        <div className="admin-detail-body">
                            <div className="admin-detail-row">
                                <span className="admin-detail-label">ID</span>
                                <span className="admin-detail-value font-mono text-xs text-gray-400">{item.id}</span>
                            </div>

                            <div className="admin-detail-row">
                                <span className="admin-detail-label">Cím</span>
                                <span className="admin-detail-value">{item.title}</span>
                            </div>

                            {(type === 'event' || type === 'issue') && (
                                <div className="admin-detail-row">
                                    <span className="admin-detail-label">Kategória</span>
                                    <span className="admin-detail-value">{item.category ?? '-'}</span>
                                </div>
                            )}

                            {(type === 'event' || type === 'issue') && (
                                <div className="admin-detail-row">
                                    <span className="admin-detail-label">Koordináták</span>
                                    <span className="admin-detail-value font-mono text-xs">
                                        {item.latitude ?? '-'}, {item.longitude ?? '-'}
                                    </span>
                                </div>
                            )}

                            {type === 'issue' && (
                                <div className="admin-detail-row">
                                    <span className="admin-detail-label">Állapot</span>
                                    <span className="admin-detail-value">
                                        {item.is_done == null ? '-' : Number(item.is_done) === 1
                                            ? <span className="admin-detail-badge-done">Kész van</span>
                                            : <span className="admin-detail-badge-pending">Nincs kész</span>}
                                    </span>
                                </div>
                            )}

                            {type === 'event' && (
                                <>
                                    <div className="admin-detail-row">
                                        <span className="admin-detail-label">Kezdés</span>
                                        <span className="admin-detail-value">{item.start_time ?? '-'}</span>
                                    </div>
                                    <div className="admin-detail-row">
                                        <span className="admin-detail-label">Befejezés</span>
                                        <span className="admin-detail-value">{item.end_time ?? '-'}</span>
                                    </div>
                                </>
                            )}

                            <div className="admin-detail-row">
                                <span className="admin-detail-label">Leírás</span>
                                <span className="admin-detail-value whitespace-pre-wrap">{item.description}</span>
                            </div>

                            <div className="admin-detail-row">
                                <span className="admin-detail-label">Létrehozva</span>
                                <span className="admin-detail-value">{item.created_at}</span>
                            </div>

                            <div className="admin-detail-row">
                                <span className="admin-detail-label">Frissítve</span>
                                <span className="admin-detail-value">{item.updated_at}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
