type AdminButtonsProps = {
    setType: (type: 'event' | 'issue' | 'statement' | 'user') => void;
    active: 'event' | 'issue' | 'statement' | 'user' | null;
};

export default function AdminButtons({ setType, active }: AdminButtonsProps) {
    return (
        <div className="admin-type-bar">
            <button
                className={`admin-type-btn${active === 'event' ? ' admin-type-btn-active' : ''}`}
                onClick={() => setType('event')}
            >
                Események
            </button>
            <button
                className={`admin-type-btn${active === 'issue' ? ' admin-type-btn-active' : ''}`}
                onClick={() => setType('issue')}
            >
                Problémák
            </button>
            <button
                className={`admin-type-btn${active === 'statement' ? ' admin-type-btn-active' : ''}`}
                onClick={() => setType('statement')}
            >
                Közlemények
            </button>
            <button
                className={`admin-type-btn${active === 'user' ? ' admin-type-btn-active' : ''}`}
                onClick={() => setType('user')}
            >
                Felhasználók
            </button>
        </div>
    );
}
