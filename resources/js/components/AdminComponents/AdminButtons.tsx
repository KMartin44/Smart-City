type AdminButtonsProps = {
    setType: (type: 'event' | 'issue' | 'statement') => void;
    active: 'event' | 'issue' | 'statement' | null;
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
        </div>
    );
}
