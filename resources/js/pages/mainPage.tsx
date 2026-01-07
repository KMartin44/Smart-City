import { MainLayout } from '@/layouts/mainLayout';
import { ReactNode } from 'react';

function MainPage() {
    return <h1>Szia</h1>;
}

// Inertia layout hozzárendelés
MainPage.layout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);

export default MainPage;
