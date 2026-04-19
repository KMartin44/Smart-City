import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="auth-page">
            <div className="auth-brand-panel">
                <div className="auth-brand-logo">
                    <Link href="/" className="auth-brand-logo-name">SmartCity</Link>
                </div>

                <div className="auth-brand-headline">
                    <h1 className="auth-brand-title">Üdvözlünk<br />a SmartCity<br />platformon!</h1>
                    <p className="auth-brand-subtitle">
                        Jelentsd be a közösségi problémákat, kövesd nyomon az eseményeket, és vegyél részt a városod fejlődésében.
                    </p>
                </div>

                <p className="auth-brand-footer">© 2026 SmartCity - Együtt épül a jó város</p>
            </div>

            <div className="auth-form-panel">
                <div className="auth-form-wrap">
                    <div className="auth-mobile-brand">
                        <Link href="/" className="auth-mobile-brand-name">SmartCity</Link>
                    </div>

                    <div className="auth-form-header">
                        <h2 className="auth-form-title">Bejelentkezés</h2>
                        <p className="auth-form-subtitle">
                            Nincs még fiókja?{' '}
                            <Link href="/register">Regisztráljon most</Link>
                        </p>
                    </div>

                    <form onSubmit={submit} className="auth-form">
                        <div className="auth-form-field">
                            <label className="auth-form-label">Email cím</label>
                            <input
                                className="auth-form-input"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="pelda@email.hu"
                            />
                            {errors.email && <p className="auth-form-error">{errors.email}</p>}
                        </div>

                        <div className="auth-form-field">
                            <label className="auth-form-label">Jelszó</label>
                            <input
                                className="auth-form-input"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="auth-form-error">{errors.password}</p>}
                        </div>

                        <button type="submit" disabled={processing} className="auth-submit-btn">
                            {processing ? 'Bejelentkezés...' : 'Bejelentkezés'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
