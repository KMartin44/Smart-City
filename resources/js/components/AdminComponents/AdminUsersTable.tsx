import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type UserType = 'lakos' | 'onkormanyzat' | 'admin';

type AdminUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    type: UserType;
    created_at: string;
};

type AdminUsersTableProps = {
    users: AdminUser[];
    currentUserId?: number;
    onRoleChange: (id: number, role: UserType) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
};

const roleLabel: Record<UserType, string> = {
    lakos: 'Lakos',
    onkormanyzat: 'Önkormányzat',
    admin: 'Admin',
};

export default function AdminUsersTable({ users, currentUserId, onRoleChange, onDelete }: AdminUsersTableProps) {
    return (
        <div className="admin-table-card">
            <div className="admin-table-header">
                <span className="admin-table-title">
                    Felhasználók
                    <span className="admin-table-count">({users.length} db)</span>
                </span>
            </div>

            <div className="admin-table-scroll">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="admin-th">ID</TableHead>
                            <TableHead className="admin-th">Név</TableHead>
                            <TableHead className="admin-th">E-mail</TableHead>
                            <TableHead className="admin-th">Szerepkör</TableHead>
                            <TableHead className="admin-th">Műveletek</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="admin-empty">Nincs felhasználó.</TableCell>
                            </TableRow>
                        )}

                        {users.map((user) => {
                            const isCurrent = currentUserId === user.id;

                            return (
                                <TableRow key={user.id}>
                                    <TableCell className="admin-td admin-td-id">{user.id}</TableCell>
                                    <TableCell className="admin-td">{user.first_name} {user.last_name}</TableCell>
                                    <TableCell className="admin-td">{user.email}</TableCell>
                                    <TableCell className="admin-td">
                                        <select
                                            className="admin-user-role-select"
                                            value={user.type}
                                            onChange={(e) => onRoleChange(user.id, e.target.value as UserType)}
                                            disabled={isCurrent}
                                            title={isCurrent ? 'A saját szerepköröd itt nem módosítható.' : 'Szerepkör módosítása'}
                                        >
                                            <option value="lakos">{roleLabel.lakos}</option>
                                            <option value="onkormanyzat">{roleLabel.onkormanyzat}</option>
                                            <option value="admin">{roleLabel.admin}</option>
                                        </select>
                                    </TableCell>
                                    <TableCell className="admin-td">
                                        <button
                                            className="admin-btn-delete"
                                            onClick={() => onDelete(user.id)}
                                            disabled={isCurrent}
                                            title={isCurrent ? 'A saját fiókod itt nem törölhető.' : 'Felhasználó törlése'}
                                        >
                                            Törlés
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
