import { MainLayout } from '@/layouts/mainLayout';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPinned, AlertCircle, CalendarDays, MessageSquare } from 'lucide-react';

function MainPage({
    stats,
    user,
}: {
    stats: { resolvedProblems: number; organizedEvents: number; activeParticipants: number };
    user?: { first_name?: string; last_name?: string; email?: string } | null;
}) {
    const hasUser = Boolean(user);
    const userName = user?.first_name ? user.first_name : 'Felhasználó';

    return (
        <div className="main-page">
            {/* Hero */}
            <section className="main-hero">
                <div className="main-hero-inner">
                    <div className="main-hero-content">
                        <h1 className="main-hero-title">Okos Város</h1>
                        {hasUser && (
                            <p className="main-hero-copy font-semibold text-lg mb-4 text-white/90">
                                Üdvözöllek, {userName}!
                            </p>
                        )}
                        <p className="main-hero-copy">
                            {hasUser
                                ? 'Nézd meg a legfrissebb bejelentéseket és folytasd a város fejlesztését.'
                                : 'Közösen építsünk jobb várost. Jelents be problémákat, szervezz eseményeket!'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="main-section">
                <div className="main-section-inner">
                    <h2 className="main-section-title">Főbb Funkciók</h2>

                    <div className="grid grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                        <Card className="main-card">
                            <div className="main-card-meta">
                                <div className="main-card-icon bg-red-100">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="main-card-title">Problémák Bejelentése</h3>
                            </div>
                            <p className="main-card-copy">
                                Jelents be közlekedési, közterületi vagy közművi problémákat egyszerűen és gyorsan. Közösen oldjuk meg őket!
                            </p>
                            <Button variant="outline" className="main-card-button" onClick={() => window.location.href = '/statements'}>
                                Probléma Bejelentése
                            </Button>
                        </Card>

                        <Card className="main-card">
                            <div className="main-card-meta">
                                <div className="main-card-icon bg-blue-100">
                                    <CalendarDays className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="main-card-title">Városi Események</h3>
                            </div>
                            <p className="main-card-copy">
                                Fedezd fel a közeljövő eseményeit, fesztiváljait és közösségi programjait. Ne hagyj ki semmit!
                            </p>
                            <Button variant="outline" className="main-card-button" onClick={() => window.location.href = '/map'}>
                                Események megtekintése
                            </Button>
                        </Card>

                        <Card className="main-card">
                            <div className="main-card-meta">
                                <div className="main-card-icon bg-green-100">
                                    <MapPinned className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="main-card-title">Interaktív Térkép</h3>
                            </div>
                            <p className="main-card-copy">
                                Tekintsd meg az összes bejelentést és eseményt az interaktív térképen. Könnyű útvonal tervezés!
                            </p>
                            <Button variant="outline" className="main-card-button" onClick={() => window.location.href = '/map'}>
                                Térkép megnyitása
                            </Button>
                        </Card>

                        <Card className="main-card">
                            <div className="main-card-meta">
                                <div className="main-card-icon bg-purple-100">
                                    <MessageSquare className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="main-card-title">Közlemények</h3>
                            </div>
                            <p className="main-card-copy">
                                Kövess a város friss közleményeit és az önkormányzat fontos bejelentéseit. Maradj informált!
                            </p>
                            <Button variant="outline" className="main-card-button" onClick={() => window.location.href = '/statements'}>
                                Közlemények megtekintése
                            </Button>
                        </Card>


                    </div>
                </div>
            </section>

            {/* Stats  */}
            <section className="main-stats">
                <div className="main-stats-inner">
                    <h2 className="main-stats-title">Okos Város Statisztikák</h2>

                    <div className="main-stats-grid">
                        <div>
                            <div className="main-stat-number text-green-600">{stats.resolvedProblems.toLocaleString()}+</div>
                            <p className="main-stat-copy">Megoldott probléma</p>
                        </div>
                        <div>
                            <div className="main-stat-number text-orange-600">{stats.organizedEvents.toLocaleString()}+</div>
                            <p className="main-stat-copy">Szervezett esemény</p>
                        </div>
                        <div>
                            <div className="main-stat-number text-purple-600">{stats.activeParticipants.toLocaleString()}+</div>
                            <p className="main-stat-copy">Aktív résztvevő</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            {!hasUser && (
                <section className="main-cta">
                    <div className="main-cta-inner">
                        <div className="main-cta-content">
                            <h2 className="main-cta-title">Készen állsz, hogy csatlakozz?</h2>
                            <p className="main-cta-copy">
                                Regisztrálj most, és kezdj közvetlenül közreműködni a városod fejlesztésében!
                            </p>
                            <div className="main-hero-actions">
                                <Button size="lg" variant="secondary" className="main-button-responsive" onClick={() => window.location.href = '/register'}>
                                    Regisztráció
                                </Button>
                                <Button size="lg" variant="secondary" className="main-button-responsive" onClick={() => window.location.href = '/login'}>
                                    Bejelentkezés
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="main-footer">
                <div className="main-footer-inner">
                    <p className="main-footer-copy">© 2026 Okos Város - Együtt épül a jó város</p>
                </div>
            </footer>
        </div>
    );
}

// Inertia layout hozzárendelés
MainPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);

export default MainPage;
