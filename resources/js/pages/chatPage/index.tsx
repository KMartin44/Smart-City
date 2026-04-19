import { MainLayout } from '@/layouts/mainLayout';
import { Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

function getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : '';
}

function apiFetch(url: string, options: RequestInit = {}) {
    return fetch(url, {
        ...options,
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            ...(options.headers ?? {}),
        },
    });
}

type ChatUser = {
    id: number;
    first_name: string;
    last_name: string;
};

type ChatMessage = {
    id: number;
    user_id: number;
    message: string;
    created_at: string;
    user: ChatUser;
};

type Props = {
    user: {
        id: number;
        first_name: string;
        last_name: string;
        type: string;
    };
};

function formatTime(dateStr: string) {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

    if (isToday) {
        return d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage({ user }: Props) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isFirstLoad = useRef(true);

    const fetchMessages = async (scrollToBottom = false) => {
        try {
            const res = await apiFetch('/api/chat');
            if (!res.ok) return;
            const data = await res.json();
            setMessages(data);
            if (scrollToBottom) {
                setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
            }
        } catch {
            //
        }
    };

    useEffect(() => {
        fetchMessages(true);
        isFirstLoad.current = false;
    }, []);

    useEffect(() => {
        const id = setInterval(() => fetchMessages(false), 4000);
        return () => clearInterval(id);
    }, []);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed || sending) return;

        setSending(true);
        try {
            const res = await apiFetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ message: trimmed }),
            });
            if (res.ok) {
                setText('');
                if (textareaRef.current) textareaRef.current.style.height = 'auto';
                await fetchMessages(true);
            }
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await apiFetch(`/api/chat/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m.id !== id));
            }
        } catch {
            //
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e as unknown as FormEvent);
        }
    };

    const canDelete = (msg: ChatMessage) => user.type === 'admin' || msg.user_id === user.id;

    return (
        <div className="chat-page">
            <div className="chat-hero">
                <div className="chat-hero-inner">
                    <div className="chat-hero-content">
                        <h1 className="chat-hero-title">Közösségi Chat</h1>
                        <p className="chat-hero-copy">Beszélgess a városod lakóival valós időben.</p>
                    </div>
                </div>
            </div>

            <div className="chat-section">
                <div className="chat-box">
                    <div className="chat-messages">
                        {messages.length === 0 ? (
                            <div className="chat-messages-empty">Még nincsenek üzenetek. Légy az első!</div>
                        ) : (
                            messages.map((msg) => {
                                const isOwn = msg.user_id === user.id;
                                return (
                                    <div key={msg.id} className={`chat-message-wrapper${isOwn ? 'chat-message-wrapper--own' : ''}`}>
                                        {!isOwn && (
                                            <span className="chat-message-sender">
                                                {msg.user.first_name} {msg.user.last_name}
                                            </span>
                                        )}
                                        <div className={`chat-message-bubble${isOwn ? 'chat-message-bubble--own' : ''}`}>{msg.message}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span className="chat-message-time">{formatTime(msg.created_at)}</span>
                                            {canDelete(msg) && (
                                                <button
                                                    className="chat-message-delete"
                                                    onClick={() => handleDelete(msg.id)}
                                                    title="Törlés"
                                                    aria-label="Üzenet törlése"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <hr className="chat-input-divider" />
                    <form className="chat-input-area" onSubmit={handleSend}>
                        <textarea
                            ref={textareaRef}
                            className="chat-input"
                            rows={1}
                            placeholder="Írj egy üzenetet…"
                            value={text}
                            onChange={handleTextChange}
                            onKeyDown={handleKeyDown}
                            maxLength={1000}
                        />
                        <button type="submit" className="chat-send-button" disabled={sending || !text.trim()}>
                            Küldés
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

ChatPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
