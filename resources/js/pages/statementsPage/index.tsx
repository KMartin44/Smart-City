import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatementsTable from '@/components/StatementsComponents/StatementsTable';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/mainLayout';
import { ReactNode } from 'react';

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
        <div className="statements-page">
            <section className="statements-hero">
                <div className="statements-hero-inner">
                    <div className="statements-hero-content">
                        <h1 className="statements-hero-title">Közlemények</h1>
                        <p className="statements-hero-copy">
                            Kövesd a város legfrissebb bejelentéseit egy letisztult, gyorsan áttekinthető listában.
                        </p>
                    </div>
                </div>
            </section>

            <section className="statements-section">
                <div className="statements-section-inner">
                    <Card className="statements-card">
                        <CardHeader>
                            <CardTitle className="statements-card-title">Összes közlemény</CardTitle>
                        </CardHeader>
                        <CardContent className="statements-card-content">
                            <StatementsTable statements={statements} canManage={canManage} />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

Index.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
