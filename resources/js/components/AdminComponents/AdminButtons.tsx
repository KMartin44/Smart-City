import { Button } from "@/components/ui/button";

type AdminButtonsProps = {
    setType: (type: 'event' | 'issue' | 'statement') => void;
};

export default function AdminButtons({ setType }: AdminButtonsProps) {
  return (
        <div>
            <Button variant="outline" onClick={() => setType('event')}>
                Események
            </Button>

            <Button variant="outline" onClick={() => setType('issue')}>
                Problémabejelentések
            </Button>

            <Button variant="outline" onClick={() => setType('statement')}>
                Közlemények
            </Button>
        </div>
    );
}