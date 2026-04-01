import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

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
            headers: {
                Accept: 'application/json',
            },
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

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

        alert('Mentve');
        router.get('/statements');
    };

    if (!allowEdit) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-red-500">Nincs jogosultságod a közlemény szerkesztéséhez.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Közlemény szerkesztése</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Cím</Label>
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Leírás</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">Mentés</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get('/statements')}
                            >
                                Vissza
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
