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
    start_time?: string;
    end_time?: string;
    created_at: string;
    updated_at: string;
};

export default function Show({ type, id }: ShowProps) {
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        let url = '';

        if (type === 'event') {
            url = `/api/events/${id}`;
        } else if (type === 'issue') {
            url = `/api/issues/${id}`;
        } else {
            url = `/api/statements/${id}`;
        }

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                setItem(response.data);
            });
    }, [type, id]);

    if (!item) {
        return <p>Betöltés...</p>;
    }

    return (
        <div>
            <h1>
                {type === 'event' && 'Esemény részletek'}
                {type === 'issue' && 'Problémabejelentés részletek'}
                {type === 'statement' && 'Közlemény részletek'}
            </h1>

            <p>
                <strong>ID: </strong> {item.id}
            </p>

            <p>
                <strong>Cím: </strong> {item.title}
            </p>

            {(type === 'event' || type === 'issue') && (
                <p>
                    <strong>Kategória: </strong> {item.category}
                </p>
            )}

            {(type === 'event' || type === 'issue') && (
                <>
                    <p>
                        <strong>Latitude: </strong> {item.latitude}
                    </p>
                    <p>
                        <strong>Longitude: </strong> {item.longitude}
                    </p>
                </>
            )}

            {type === 'event' && (
                <>
                    <p>
                        <strong>Kezdés: </strong> {item.start_time}
                    </p>
                    <p>
                        <strong>Befejezés: </strong> {item.end_time}
                    </p>
                </>
            )}

            <p>
                <strong>Leírás: </strong>
            </p>
            <p>{item.description}</p>

            <p>
                <strong>Létrehozva: </strong> {item.created_at}
            </p>
        </div>
    );
}
