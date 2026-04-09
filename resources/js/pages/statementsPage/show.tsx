import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type ShowProps = {
    id: number;
    userType?: string | null;
};

const canManageStatement = (userType?: string | null) => {
    return ['admin', 'onkormanyzat', 'onkormanyzati'].includes(userType ?? '');
};

type Statement = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export default function Show({ id, userType }: ShowProps) {
    const [statement, setStatement] = useState<Statement | null>(null);

    useEffect(() => {
        fetch(`/api/statements/${id}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                setStatement(response.data);
            });
    }, [id]);

    if (!statement) {
        return <p>Betöltés...</p>;
    }

    const canManage = canManageStatement(userType);

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{statement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Leírás:</strong> {statement.description}</p>
                    <p><strong>Létrehozva:</strong> {statement.created_at}</p>
                    <p><strong>Frissítve:</strong> {statement.updated_at}</p>
                    <div className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => router.get('/statements')}
                            className="mr-2"
                        >
                            Vissza
                        </Button>
                        {canManage && (
                            <Button
                                variant="outline"
                                onClick={() => router.get(`/statements/edit/${statement.id}`)}
                            >
                                Szerkesztés
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
