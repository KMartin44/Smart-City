import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        dob: '',
        address: '',
        type: 'lakos',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/register');
    }

    return (
        <div className="auth-page">
            <div className="auth-brand-panel">
                <div className="auth-brand-logo">
                    <Link href="/" className="auth-brand-logo-name">SmartCity</Link>
                </div>

                <div className="auth-brand-headline">
                    <h1 className="auth-brand-title">Csatlakozz<br />a SmartCity<br />közösséghez!</h1>
                    <p className="auth-brand-subtitle">
                        Regisztrálj és vegyél részt aktívan a városod életében, jelezd a problémákat, kövesd az eseményeket.
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
                        <h2 className="auth-form-title">Regisztráció</h2>
                        <p className="auth-form-subtitle">
                            Már van fiókja?{' '}
                            <Link href="/login">Jelentkezzen be</Link>
                        </p>
                    </div>

                    <form onSubmit={submit} className="auth-form">
                        <div className="auth-form-grid">
                            <div className="auth-form-field">
                                <label className="auth-form-label">Keresztnév</label>
                                <input
                                    className="auth-form-input"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    placeholder="Péter"
                                />
                                {errors.first_name && <p className="auth-form-error">{errors.first_name}</p>}
                            </div>

                            <div className="auth-form-field">
                                <label className="auth-form-label">Vezetéknév</label>
                                <input
                                    className="auth-form-input"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    placeholder="Kovács"
                                />
                                {errors.last_name && <p className="auth-form-error">{errors.last_name}</p>}
                            </div>
                        </div>

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

                        <div className="auth-form-grid">
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

                            <div className="auth-form-field">
                                <label className="auth-form-label">Jelszó megerősítése</label>
                                <input
                                    className="auth-form-input"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && <p className="auth-form-error">{errors.password_confirmation}</p>}
                            </div>
                        </div>

                        <div className="auth-form-grid">
                            <div className="auth-form-field">
                                <label className="auth-form-label">Telefonszám</label>
                                <input
                                    className="auth-form-input"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    placeholder="+36 30 123 4567"
                                />
                                {errors.phone_number && <p className="auth-form-error">{errors.phone_number}</p>}
                            </div>

                            <div className="auth-form-field">
                                <label className="auth-form-label">Születési dátum</label>
                                <input
                                    className="auth-form-input"
                                    type="date"
                                    value={data.dob}
                                    onChange={(e) => setData('dob', e.target.value)}
                                />
                                {errors.dob && <p className="auth-form-error">{errors.dob}</p>}
                            </div>
                        </div>

                        <div className="auth-form-field">
                            <label className="auth-form-label">Lakcím</label>
                            <input
                                className="auth-form-input"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="1234 Budapest, Példa utca 1."
                            />
                            {errors.address && <p className="auth-form-error">{errors.address}</p>}
                        </div>

                        <div className="auth-form-field">
                            <label className="auth-form-label">Felhasználó típusa</label>
                            <Select defaultValue="lakos" onValueChange={(value) => setData('type', value ?? 'lakos')}>
                                <SelectTrigger className="auth-form-select-trigger">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lakos">Lakos</SelectItem>
                                    <SelectItem value="onkormanyzat">Önkormányzat</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <button type="submit" disabled={processing} className="auth-submit-btn">
                            {processing ? 'Regisztráció...' : 'Regisztráció'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
