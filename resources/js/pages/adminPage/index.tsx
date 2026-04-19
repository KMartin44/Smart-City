import AdminButtons from '@/components/AdminComponents/AdminButtons';
import AdminTable from '@/components/AdminComponents/AdminTable';
import AdminUsersTable from '@/components/AdminComponents/AdminUsersTable';
import { MainLayout } from '@/layouts/mainLayout';
import { useEffect, useState } from 'react';

type Types = 'event' | 'issue' | 'statement' | 'user' | null;
type Items = {
    id: number;
    title: string;
};

type UserType = 'lakos' | 'onkormanyzat' | 'admin';

type AdminUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    type: UserType;
    created_at: string;
};

type IndexProps = {
    auth?: {
        user?: {
            id: number;
        };
    };
};

export default function Index({ auth }: IndexProps) {
    const [type, setType] = useState<Types>('event');
    const [items, setItems] = useState<Items[]>([]);
    const [users, setUsers] = useState<AdminUser[]>([]);

    useEffect(() => {
        if (!type) return;

        if (type === 'user') {
            fetch('/api/admin/users', {
                headers: {
                    Accept: 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => setUsers(data));
            return;
        }

        let url = '';

        if (type === 'event') {
            url = '/api/events';
        } else if (type === 'issue') {
            url = '/api/issues';
        } else if (type === 'statement') {
            url = '/api/statements';
        }

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, [type]);

    const updateUserRole = async (id: number, role: UserType) => {
        const res = await fetch(`/api/admin/users/${id}/role`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: role }),
        });

        if (!res.ok) {
            alert('A szerepkör módosítása sikertelen volt.');
            return;
        }

        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, type: role } : u)));
    };

    const deleteUser = async (id: number) => {
        const confirmed = window.confirm('Biztosan törölni szeretnéd ezt a felhasználót?');
        if (!confirmed) return;

        const res = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!res.ok) {
            alert('A felhasználó törlése sikertelen volt.');
            return;
        }

        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <MainLayout>
            <div className="admin-page">
                <div className="admin-hero">
                    <div className="admin-hero-inner">
                        <div className="admin-hero-text">
                            <h1 className="admin-hero-title">Admin panel</h1>
                            <p className="admin-hero-subtitle">Kezeld az eseményeket, problémákat, közleményeket és felhasználókat.</p>
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <AdminButtons setType={setType} active={type} />
                    {type && type !== 'user' && <AdminTable items={items} type={type} />}
                    {type === 'user' && (
                        <AdminUsersTable
                            users={users}
                            currentUserId={auth?.user?.id}
                            onRoleChange={updateUserRole}
                            onDelete={deleteUser}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
