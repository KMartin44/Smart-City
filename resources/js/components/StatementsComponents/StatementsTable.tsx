import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';

type Statement = {
    id: number;
    title: string;
};

type TableProps = {
    statements: Statement[];
    canManage: boolean;
};

export default function StatementsTable({ statements, canManage }: TableProps) {
    const deleteStatement = async (id: number) => {
        await fetch(`/api/statements/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });

        location.reload();
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
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteStatement(statement.id)}
                                    >
                                        Törlés
                                    </Button>
                                </>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
