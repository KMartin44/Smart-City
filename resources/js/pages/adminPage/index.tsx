import AdminButtons from '@/components/AdminComponents/AdminButtons';
import AdminTable from '@/components/AdminComponents/AdminTable';
import { useEffect, useState } from 'react';

type Types = 'event' | 'issue' | 'statement' | null;
type Items = {
    id: number;
    title: string;
};

export default function Index() {
    const [type, setType] = useState<Types>(null);
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
        <>
            <h1>Admin oldal</h1>

            <AdminButtons setType={setType} />

            {type && <AdminTable items={items} type={type} />}
        </>
    );
}
