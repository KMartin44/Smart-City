import React, { useEffect, useState, ReactNode } from "react";
import { MainLayout } from '@/layouts/mainLayout';
import CreateIssueModal from "@/components/IssueComponents/CreateIssueModal";


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

    const fetchIssues = async () => {
        await fetch("api/issues").then((res) => res.json()).then((data) => setIssues(data));
    };
    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div>
            <h1>Problémák</h1>
            <button onClick={() => setShowModal(true)}>
                Probléma bejelentése
            </button>
            <CreateIssueModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={fetchIssues}
            />
            <div>
                {issues.map((issue) => (
                    <div key={issue.id} className="issueCard">
                        <h2>{issue.title}</h2>
                        <h5>{issue.category}</h5>
                        <p>{issue.description}</p>
                        <p>Koordináták: {Number(issue.latitude).toFixed(4)}° N, {Number(issue.longitude).toFixed(4)}° E</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

IssuesPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);