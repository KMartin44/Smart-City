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
        <>
            <div className="statements-mobile-list">
                {statements.map((statement) => (
                    <article key={statement.id} className="statements-mobile-card">
                        <h3 className="statements-mobile-card-title">{statement.title}</h3>
                        <div className="statements-mobile-actions">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/statements/show/${statement.id}`)}
                                className="statements-mobile-action-button"
                            >
                                Részletek
                            </Button>
                            {canManage && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get(`/statements/edit/${statement.id}`)}
                                        className="statements-mobile-action-button"
                                    >
                                        Módosítás
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteStatement(statement.id)}
                                        className="statements-mobile-action-button"
                                    >
                                        Törlés
                                    </Button>
                                </>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            <Table className="statements-table">
                <TableHeader className="statements-table-header">
                    <TableRow className="statements-table-header-row">
                        <TableHead className="statements-table-head">Cím</TableHead>
                        <TableHead className="statements-table-head">Műveletek</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="statements-table-body">
                    {statements.map((statement) => (
                        <TableRow key={statement.id} className="statements-table-row">
                            <TableCell className="statements-table-cell statements-table-cell-title">{statement.title}</TableCell>
                            <TableCell className="statements-table-actions-cell">
                                <div className="statements-table-actions">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.get(`/statements/show/${statement.id}`)}
                                        className="statements-table-action-button"
                                    >
                                        Részletek
                                    </Button>
                                    {canManage && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(`/statements/edit/${statement.id}`)}
                                                className="statements-table-action-button"
                                            >
                                                Módosítás
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteStatement(statement.id)}
                                                className="statements-table-action-button"
                                            >
                                                Törlés
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
