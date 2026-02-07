type AdminButtonsProps = {
    setType: (type: 'event' | 'issue' | 'statement') => void;
};

export default function AdminButtons({ setType }: AdminButtonsProps) {
  return (
        <div>
            <button onClick={() => setType('event')}>Események</button>
            <button onClick={() => setType('issue')}>Problémabejelentések</button>
            <button onClick={() => setType('statement')}>Közlemények</button>
        </div>
    );
}