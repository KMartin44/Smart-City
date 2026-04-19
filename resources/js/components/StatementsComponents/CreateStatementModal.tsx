import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
};

type StatementModalPageProps = {
    auth?: {
        user?: {
            id?: number;
        } | null;
    };
};

export default function CreateStatementModal({ isOpen, onClose, onCreated }: Props) {
    const { auth } = usePage<StatementModalPageProps>().props;
    const userId = auth?.user?.id;

    const [data, setData] = useState({
        title: '',
        description: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            alert('Be kell jelentkezned a közlemény létrehozásához.');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/statements', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    user_id: userId,
                }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => null);
                const message = payload?.message || 'A közlemény létrehozása sikertelen volt.';
                alert(message);
                return;
            }

            setData({ title: '', description: '' });
            onCreated();
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="community-modal-content">
                <DialogHeader className="community-modal-header">
                    <DialogTitle className="community-modal-title">Új közlemény</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="community-modal-form">
                    <div className="community-modal-field">
                        <Label className="community-modal-label">Cím</Label>
                        <Input
                            className="community-modal-input"
                            value={data.title}
                            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="community-modal-field">
                        <Label className="community-modal-label">Leírás</Label>
                        <Textarea
                            className="community-modal-textarea"
                            value={data.description}
                            onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                            required
                        />
                    </div>

                    <DialogFooter className="community-modal-footer">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="community-modal-secondary-button"
                            disabled={submitting}
                        >
                            Mégse
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            className="community-modal-primary-button"
                            disabled={submitting}
                        >
                            {submitting ? 'Mentés...' : 'Mentés'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
