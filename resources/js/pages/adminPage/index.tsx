import AdminButtons from '@/components/AdminComponents/AdminButtons';
import AdminTable from '@/components/AdminComponents/AdminTable';
import { MainLayout } from '@/layouts/mainLayout';
import { useEffect, useState } from 'react';

type Types = 'event' | 'issue' | 'statement' | null;
type Items = {
    id: number;
    title: string;
};

export default function Index() {
    const [type, setType] = useState<Types>('event');
    const [items, setItems] = useState<Items[]>([]);

    useEffect(() => {
        if (!type) return;

        let url = '';

        if (type === 'event') {
            url = '/api/events';
        } else if (type === 'issue') {
            url = '/api/issues';
        } else if (type === 'statement') {
            url = '/api/statements';
        }

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, [type]);

    return (
        <MainLayout>
            <div className="admin-page">
                <div className="admin-hero">
                    <div className="admin-hero-inner">
                        <div className="admin-hero-text">
                            <h1 className="admin-hero-title">Admin panel</h1>
                            <p className="admin-hero-subtitle">Kezeld az eseményeket, problémákat és közleményeket.</p>
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <AdminButtons setType={setType} active={type} />
                    {type && <AdminTable items={items} type={type} />}
                </div>
            </div>
        </MainLayout>
    );
}
