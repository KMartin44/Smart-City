import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

type Statement = {
    id: number;
    title: string;
    user_id: number;
};

type TableProps = {
    statements: Statement[];
    canManage: boolean;
};

export default function StatementsTable({ statements, canManage }: TableProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const ensureCsrfCookie = async () => {
        await fetch('/sanctum/csrf-cookie', {
            credentials: 'same-origin',
        });
    };

    const deleteStatement = async (id: number) => {
        await ensureCsrfCookie();

        await fetch(`/api/statements/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
            },
        });

        location.reload();
    };

    const canDeleteStatement = (statement: Statement) => {
        return user && (user.type === 'admin' || user.id === statement.user_id);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cím</TableHead>
                    <TableHead>Műveletek</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {statements.map((statement) => (
                    <TableRow key={statement.id}>
                        <TableCell>{statement.id}</TableCell>
                        <TableCell>{statement.title}</TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/statements/show/${statement.id}`)}
                                className="mr-2"
                            >
                                Részletek
                            </Button>
                            {canManage && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get(`/statements/edit/${statement.id}`)}
                                        className="mr-2"
                                    >
                                        Módosítás
                                    </Button>
                                </>
                            )}
                            {canDeleteStatement(statement) && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteStatement(statement.id)}
                                >
                                    Törlés
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
