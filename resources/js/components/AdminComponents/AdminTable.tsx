import { router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Type = 'event' | 'issue' | 'statement';

type Items = {
    id: number;
    title: string;
};

type TableProps = {
    items: Items[];
    type: Type;
};

export default function AdminTable({ items, type }: TableProps) {
    if (!type) return null;

    const deleteItem = async (id: number) => {
        let url = '';

        if (type === 'event') {
            url = `/api/events/${id}`;
        } else if (type === 'issue') {
            url = `/api/issues/${id}`;
        } else {
            url = `/api/statements/${id}`;
        }

        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });

        location.reload();
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cím</TableHead>
                        <TableHead>Műveletek</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>

                            <TableCell>
                                {item.title}
                            </TableCell>

                            <TableCell>
                                <Button
                                    variant="outline"
                                    onClick={() => router.get(`/admin/show/${type}/${item.id}`)}
                                >
                                    Részletek
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={() => router.get(`/admin/edit/${type}/${item.id}`)}
                                >
                                    Módosítás
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Törlés
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
