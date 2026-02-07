import { router } from '@inertiajs/react';

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
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cím</th>
                    <th>Műveletek</th>
                </tr>
            </thead>

            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>

                        <td>{item.title}</td>

                        <td>
                            <button onClick={() => router.get(`/admin/show/${type}/${item.id}`)}>Részletek</button>

                            <button onClick={() => router.get(`/admin/edit/${type}/${item.id}`)}>Módosítás</button>

                            <button onClick={() => deleteItem(item.id)}>Törlés</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
