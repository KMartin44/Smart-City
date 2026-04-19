import CreateIssueModal from '@/components/IssueComponents/CreateIssueModal';
import { MainLayout } from '@/layouts/mainLayout';
import { ReactNode, useEffect, useState } from 'react';
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
    is_done: boolean;
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
        const res = await fetch('/api/issues', {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });
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

    const deleteIssue = async (issue: Issue) => {
        const confirmed = window.confirm(`Biztosan törölni szeretnéd ezt a problémát?\n\n${issue.title}`);
        if (!confirmed) return;

        const res = await fetch(`/api/issues/${issue.id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });

        if (!res.ok) {
            alert('A törlés sikertelen volt.');
            return;
        }

        fetchIssues();
    };

    const toggleDone = async (issue: Issue) => {
        await fetch(`/api/issues/${issue.id}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_done: !issue.is_done }),
        });
        fetchIssues();
    };

    return (
        <div className="community-feed-page">
            <section className="community-feed-hero">
                <div className="community-feed-hero-inner">
                    <div className="community-feed-hero-content">
                        <h1 className="community-feed-hero-title">Problémák</h1>
                        <p className="community-feed-hero-copy">
                            Fedezd fel a város problémáit egy egységes, áttekinthető felületen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="community-feed-section">
                <div className="community-feed-section-inner">
                    <div className="community-feed-toolbar">
                        <div>
                            <h2 className="community-feed-toolbar-title">Aktív problémák</h2>
                            <p className="community-feed-toolbar-copy">
                                Gyors áttekintés kategóriával, leírással és koordinátákkal.
                            </p>
                        </div>
                        <Button variant="outline" className="community-feed-primary-button" onClick={() => setShowModal(true)}>
                            Probléma bejelentése
                        </Button>
                    </div>

                <CreateIssueModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onCreated={fetchIssues}
                />

                    <div className="community-feed-grid">
                        {issues.map((issue) => (
                            <Card key={issue.id} className="community-feed-card">
                                <CardHeader className="community-feed-card-header">
                                    <div className="community-feed-card-title-row">
                                        <CardTitle className="community-feed-card-title">{issue.title}</CardTitle>
                                        {canDeleteIssue(issue) && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteIssue(issue)}
                                                className="community-feed-card-delete-button"
                                            >
                                                Törlés
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="community-feed-card-content">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="community-feed-card-badge">
                                            {categoryLabels[issue.category] ?? issue.category}
                                        </div>
                                        <div className={`community-feed-card-badge ${
                                            issue.is_done
                                                ? '!bg-green-50 !text-green-700'
                                                : '!bg-blue-50 !text-blue-700'
                                        }`}>
                                            {issue.is_done ? 'Megoldva' : 'Aktív'}
                                        </div>
                                    </div>
                                    <p className="community-feed-card-description">{issue.description}</p>
                                    <div className="community-feed-card-detail">
                                        Koordináták: {issue.latitude.toFixed(6)}, {issue.longitude.toFixed(6)}
                                    </div>
                                    {(user?.type === 'admin' || user?.type === 'onkormanyzati') && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleDone(issue)}
                                            className={`w-full mt-1 cursor-pointer ${
                                                issue.is_done
                                                    ? 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                                    : 'border-green-600 text-green-700 hover:bg-green-50'
                                            }`}
                                        >
                                            {issue.is_done ? 'Megjelölés aktívként' : 'Megjelölés megoldottként'}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

IssuesPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
