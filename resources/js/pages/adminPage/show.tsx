import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <Card>
            <CardHeader>
                <CardTitle>
                    {type === 'event' && 'Esemény részletek'}
                    {type === 'issue' && 'Problémabejelentés részletek'}
                    {type === 'statement' && 'Közlemény részletek'}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div>
                    <strong>ID:</strong> {item.id}
                </div>

                <div>
                    <strong>Cím:</strong> {item.title}
                </div>

                {(type === 'event' || type === 'issue') && (
                    <div>
                        <strong>Kategória:</strong> {item.category ?? '-'}
                    </div>
                )}

                {(type === 'event' || type === 'issue') && (
                    <>
                        <div>
                            <strong>Latitude:</strong> {item.latitude ?? '-'}
                        </div>

                        <div>
                            <strong>Longitude:</strong> {item.longitude ?? '-'}
                        </div>
                    </>
                )}

                {type === 'event' && (
                    <>
                        <div>
                            <strong>Kezdés:</strong> {item.start_time ?? '-'}
                        </div>

                        <div>
                            <strong>Befejezés:</strong> {item.end_time ?? '-'}
                        </div>
                    </>
                )}

                <Separator />

                <div>
                    <strong>Leírás:</strong>
                    <p>
                        {item.description}
                    </p>
                </div>

                <Separator />

                <div>
                    <div>Létrehozva: {item.created_at}</div>
                    <div>Frissítve: {item.updated_at}</div>
                </div>
            </CardContent>
        </Card>
    );
}
