import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card>
            <CardHeader>
                <CardTitle>Szerkesztés</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label>Cím</Label>
                        <Input
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {(type === 'event' || type === 'issue') && (
                        <div>
                            <Label>Kategória</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData((prev) => ({
                                        ...prev,
                                        category: value ?? undefined,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Válassz kategóriát" />
                                </SelectTrigger>

                                <SelectContent>
                                    {type === 'event' && (
                                        <>
                                            <SelectItem value="kultura">Kulturális</SelectItem>
                                            <SelectItem value="kozossegi">Közösségi</SelectItem>
                                            <SelectItem value="oktatas">Oktatás</SelectItem>
                                            <SelectItem value="sport">Sport</SelectItem>
                                            <SelectItem value="csaladi">Családi</SelectItem>
                                            <SelectItem value="kreativ">Kreatív</SelectItem>
                                            <SelectItem value="vallasi">Vallási</SelectItem>
                                            <SelectItem value="onkormanyzati">Önkormányzati</SelectItem>
                                            <SelectItem value="egyeb">Egyéb</SelectItem>
                                        </>
                                    )}

                                    {type === 'issue' && (
                                        <>
                                            <SelectItem value="kozterulet">Közterület</SelectItem>
                                            <SelectItem value="kornyezet">Környezet</SelectItem>
                                            <SelectItem value="kozlekedes">Közlekedés</SelectItem>
                                            <SelectItem value="zaj">Zaj</SelectItem>
                                            <SelectItem value="kozmuvek">Közművek</SelectItem>
                                            <SelectItem value="allat">Állatok</SelectItem>
                                            <SelectItem value="digitalis">Digitális</SelectItem>
                                            <SelectItem value="egyeb">Egyéb</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {(type === 'event' || type === 'issue') && (
                        <div>
                            <div className="space-y-2">
                                <Label>Szélesség</Label>
                                <Input
                                    type="number"
                                    step="0.00000001"
                                    name="latitude"
                                    value={data.latitude ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Hosszúság</Label>
                                <Input
                                    type="number"
                                    step="0.00000001"
                                    name="longitude"
                                    value={data.longitude ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {type === 'event' && (
                        <div>
                            <div>
                                <Label>Kezdés</Label>
                                <Input
                                    type="datetime-local"
                                    name="start_time"
                                    value={data.start_time ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Befejezés</Label>
                                <Input
                                    type="datetime-local"
                                    name="end_time"
                                    value={data.end_time ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <Label>Leírás</Label>
                        <Textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Mentés
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
