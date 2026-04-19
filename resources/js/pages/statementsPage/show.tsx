import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/mainLayout';

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
        return (
            <MainLayout>
                <div className="statement-details-loading-wrap">
                    <p className="statement-details-loading">Betöltés...</p>
                </div>
            </MainLayout>
        );
    }

    const canManage = canManageStatement(userType);

    return (
        <MainLayout>
            <div className="statement-details-page">
                <section className="statement-details-hero">
                    <div className="statement-details-hero-inner">
                        <div className="statement-details-hero-content">
                            <h1 className="statement-details-hero-title">Közlemény részletei</h1>
                            <p className="statement-details-hero-copy">
                                Áttekintheted a kiválasztott közlemény minden fontos adatát.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="statement-details-section">
                    <div className="statement-details-section-inner">
                        <Card className="statement-details-card">
                            <CardHeader>
                                <CardTitle className="statement-details-card-title">{statement.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="statement-details-card-content">
                                <div className="statement-details-grid">
                                    <div className="statement-details-item">
                                        <p className="statement-details-label">Leírás</p>
                                        <p className="statement-details-value statement-details-description">{statement.description}</p>
                                    </div>
                                    <div className="statement-details-item">
                                        <p className="statement-details-label">Létrehozva</p>
                                        <p className="statement-details-value">{statement.created_at}</p>
                                    </div>
                                    <div className="statement-details-item">
                                        <p className="statement-details-label">Frissítve</p>
                                        <p className="statement-details-value">{statement.updated_at}</p>
                                    </div>
                                </div>

                                <div className="statement-details-actions">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get('/statements')}
                                        className="statement-details-action-button"
                                    >
                                        Vissza
                                    </Button>
                                    {canManage && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.get(`/statements/edit/${statement.id}`)}
                                            className="statement-details-action-button"
                                        >
                                            Szerkesztés
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
