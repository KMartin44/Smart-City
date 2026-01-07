export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">
                <h2>Header</h2>
            </header>

            <main className="flex-1 p-6">
                {children}
            </main>

            <footer className="bg-gray-200 p-4 text-center">
                <small>Footer</small>
            </footer>
        </div>
    );
}
