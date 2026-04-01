import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatementsTable from '@/components/StatementsComponents/StatementsTable';
import { useEffect, useState } from 'react';

type Statement = {
    id: number;
    title: string;
};

type IndexProps = {
    userType?: string | null;
};

const canManageStatement = (userType?: string | null) => {
    return ['admin', 'onkormanyzat', 'onkormanyzati'].includes(userType ?? '');
};

export default function Index({ userType }: IndexProps) {
    const [statements, setStatements] = useState<Statement[]>([]);
    const canManage = canManageStatement(userType);

    useEffect(() => {
        fetch('/api/statements', {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setStatements(data));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Közlemények</CardTitle>
                </CardHeader>
                <CardContent>
                    <StatementsTable statements={statements} canManage={canManage} />
                </CardContent>
            </Card>
        </div>
    );
}
