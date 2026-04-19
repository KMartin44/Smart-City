import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/layouts/mainLayout';
import { router } from '@inertiajs/react';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';

type EditProps = {
    id: number;
    userType?: string | null;
};

const canManageStatement = (userType?: string | null) => {
    return ['admin', 'onkormanyzat', 'onkormanyzati'].includes(userType ?? '');
};

type FormData = {
    title: string;
    description: string;
};

export default function Edit({ id, userType }: EditProps) {
    const [data, setData] = useState<FormData>({
        title: '',
        description: '',
    });

    useEffect(() => {
        fetch(`/api/statements/${id}`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => res.json())
            .then((response) => {
                setData({
                    title: response.data.title,
                    description: response.data.description,
                });
            });
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const allowEdit = canManageStatement(userType);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!allowEdit) {
            alert('Nincs jogosultságod szerkeszteni.');
            return;
        }

        await fetch(`/api/statements/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        });

        router.get('/statements');
    };

    if (!allowEdit) {
        return (
            <div className="statement-details-page">
                <section className="statement-details-section">
                    <div className="statement-details-section-inner">
                        <p className="text-red-500 text-sm">Nincs jogosultságod a közlemény szerkesztéséhez.</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="statement-details-page">
            <section className="statement-details-hero">
                <div className="statement-details-hero-inner">
                    <div className="statement-details-hero-content">
                        <h1 className="statement-details-hero-title">Közlemény szerkesztése</h1>
                        <p className="statement-details-hero-copy">
                            Módosítsd a közlemény tartalmát az alábbi űrlapon.
                        </p>
                    </div>
                </div>
            </section>

            <section className="statement-details-section">
                <div className="statement-details-section-inner">
                    <div className="statement-edit-card">
                        <div className="statement-edit-card-header">
                            <h2 className="statement-edit-card-title">Szerkesztés</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="statement-edit-form">
                                <div className="statement-edit-field">
                                    <Label className="statement-edit-label" htmlFor="title">Cím</Label>
                                    <Input
                                        className="statement-edit-input"
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="statement-edit-field">
                                    <Label className="statement-edit-label" htmlFor="description">Leírás</Label>
                                    <Textarea
                                        className="statement-edit-input statement-edit-textarea"
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="statement-edit-footer">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="statement-edit-cancel-button"
                                    onClick={() => router.get('/statements')}
                                >
                                    Vissza
                                </Button>
                                <Button type="submit" variant="outline" className="statement-edit-submit-button">
                                    Mentés
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

Edit.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
