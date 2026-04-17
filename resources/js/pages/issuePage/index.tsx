import CreateIssueModal from '@/components/IssueComponents/CreateIssueModal';
import { MainLayout } from '@/layouts/mainLayout';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

type Issue = {
    id: number;
    category: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    user_id: number;
};

const categoryLabels: Record<string, string> = {
    kozterulet: 'Közterület és infrastruktúra',
    kornyezet: 'Zöldterület és környezetvédelem',
    koztisztasag: 'Köztisztaság',
    kozlekedes: 'Közlekedés és forgalom',
    zaj: 'Zaj rend és együttélés',
    kozmuvek: 'Közművek',
    allat: 'Állatokkal kapcsolatos ügyek',
    intezmenyek: 'Intézmények és szolgáltatások',
    digitalis: 'Digitális / ügyintézési problémák',
    egyeb: 'Egyéb',
};

export default function IssuesPage() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [issues, setIssues] = useState<Issue[]>([]);
    const [showModal, setShowModal] = useState(false);

    const fetchIssues = async () => {
    const res = await fetch('api/issues');
    const data = await res.json();
    setIssues(
        data.map((issue: any) => ({
            ...issue,
            latitude: parseFloat(issue.latitude),
            longitude: parseFloat(issue.longitude),
        }))
    );
};

    useEffect(() => {
        fetchIssues();
    }, []);

    const canDeleteIssue = (issue: Issue) => {
        return user && (user.type === 'admin' || user.id === issue.user_id);
    };

    return (
        <MainLayout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Problémák</h1>
                    <Button onClick={() => setShowModal(true)}>Probléma bejelentése</Button>
                </div>

                {/* CreateIssueModal */}
                <CreateIssueModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onCreated={fetchIssues}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {issues.map((issue) => (
                        <Card key={issue.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{issue.title}</CardTitle>
                                        {canDeleteIssue(issue) && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {}}
                                        >
                                            Törlés
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-sm text-muted-foreground">
                                    {categoryLabels[issue.category] ?? issue.category}
                                </div>
                                <p>{issue.description}</p>
                                <div className="text-sm text-muted-foreground">
                                    Koordináták: {issue.latitude.toFixed(6)}, {issue.longitude.toFixed(6)}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}