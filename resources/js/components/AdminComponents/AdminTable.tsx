import { router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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

    const typeLabel = type === 'event' ? 'Események' : type === 'issue' ? 'Problémabejelentések' : 'Közlemények';

    return (
        <div className="admin-table-card">
            <div className="admin-table-header">
                <span className="admin-table-title">
                    {typeLabel}
                    <span className="admin-table-count">({items.length} db)</span>
                </span>
            </div>
            <div className="admin-table-scroll">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="admin-th">ID</TableHead>
                        <TableHead className="admin-th">Cím</TableHead>
                        <TableHead className="admin-th">Műveletek</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="admin-empty">Nincs találat.</TableCell>
                        </TableRow>
                    )}
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="admin-td admin-td-id">{item.id}</TableCell>

                            <TableCell className="admin-td">
                                {item.title}
                            </TableCell>

                            <TableCell className="admin-td">
                                <div className="admin-td-actions">
                                <button
                                    className="admin-btn-view"
                                    onClick={() => router.get(`/admin/show/${type}/${item.id}`)}
                                >
                                    Részletek
                                </button>

                                <button
                                    className="admin-btn-edit"
                                    onClick={() => router.get(`/admin/edit/${type}/${item.id}`)}
                                >
                                    Módosítás
                                </button>

                                <button
                                    className="admin-btn-delete"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Törlés
                                </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </div>
    );
}
