import React, { useEffect, useState, ReactNode } from "react";
import { MainLayout } from '@/layouts/mainLayout';
import CreateIssueModal from "@/components/IssueComponents/CreateIssueModal";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


type Issue = {
    id: number;
    category: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
};


export default function IssuesPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [showModal, setShowModal] = useState(false);
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

    const fetchIssues = async () => {
        await fetch("api/issues").then((res) => res.json()).then((data) => setIssues(data));
    };
    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div>
            <h1>Problémák</h1>
            <Button onClick={() => setShowModal(true)}>
                Probléma bejelentése
            </Button>
            <CreateIssueModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={fetchIssues}
            />
            <div>
                {issues.map((issue) => (
                    <Card key={issue.id} className="issueCard">
                        <CardTitle>{issue.title}</CardTitle>
                        <CardDescription>{issue.description}</CardDescription>
                        <p>{categoryLabels[issue.category] || issue.category}</p>
                        <p><span className="bigger">Koordináták:</span> {Number(issue.latitude).toFixed(4)}° N, {Number(issue.longitude).toFixed(4)}° E</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

IssuesPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);