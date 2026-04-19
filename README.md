# SmartCity

Egy közösségi platform városlakók és önkormányzat számára, iskolai projektként készítve. A polgárok problémákat jelenthetnek be, böngészhetnek városi eseményeket, olvashatják a hivatalos közleményeket, és valós idejű közösségi csevegésben vehetnek részt — egy helyen.

---

## Funkciók

- **Problémák** — A polgárok helyi problémákat jelenthetnek be (infrastruktúra, környezet, zaj stb.). Az önkormányzati felhasználók megjelölhetik őket megoldottként. A helyszín fordított geokódolással automatikusan utcanévre alakul.
- **Események** — Közösségi események böngészése és létrehozása, térképes helyszínválasztással és automatikus cím-megjelenítéssel.
- **Közlemények** — Hivatalos bejelentések, amelyeket az önkormányzat vagy admin publikál és kezel.
- **Chat** — Valós idejű közösségi csevegő, ahol a bejelentkezett felhasználók üzenhetnek egymásnak. A saját üzenetek törölhetők; admin bármely üzenetet törölhet.
- **Térkép** — Interaktív térképnézet a városról.
- **Admin panel** — Minden tartalom kezelése (események, problémák, közlemények) részletes és szerkesztő nézetekkel. Felhasználók kezelése: szerepkör-módosítás és törlés.
- **Szerepköralapú hozzáférés** — Három felhasználói szerepkör különböző jogosultságokkal: `lakos`, `onkormanyzat`, `admin`.

---

## Technológiai stack

| Réteg | Technológia |
|---|---|
| Backend | Laravel 12 (PHP 8.2+) |
| Frontend | React + TypeScript (Inertia.js) |
| Stílus | Tailwind CSS v4 + egyedi komponens CSS |
| Build eszköz | Vite |
| Hitelesítés | Laravel Sanctum |
| Geokódolás | Nominatim API (OpenStreetMap), 30 napos cache-sel |
| Térképek | Leaflet / React-Leaflet |
| UI komponensek | shadcn/ui |
| Adatbázis | MySQL (XAMPP) |

---

## Követelmények

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL (pl. XAMPP-on keresztül)

---

## Telepítés

```bash
# 1. Klónozd a repót
git clone https://github.com/KMartin44/Smart-City.git
cd Smart-City

# 2. PHP függőségek telepítése
composer install

# 3. JS függőségek telepítése
npm install

# 4. Környezeti fájl beállítása
cp .env.example .env
php artisan key:generate
```

Szerkeszd az `.env` fájlt, és add meg az adatbázis adatait:

```env
DB_DATABASE=smartcity
DB_USERNAME=root
DB_PASSWORD=
```

```bash
# 5. Migráció és demo adatok feltöltése
php artisan migrate --seed

# 6. Fejlesztői szerverek indítása
php artisan serve
npm run dev
```

Az alkalmazás elérhető lesz a `http://localhost:8000` címen.

---

## Demo fiókok

| Szerepkör | E-mail | Jelszó |
|---|---|---|
| Lakos | lakos@example.com | password |
| Önkormányzat | onkormanyzat@example.com | password |
| Admin | admin@example.com | password |

---

## Szerepkörök és jogosultságok

| Művelet | Lakos | Önkormányzat | Admin |
|---|:---:|:---:|:---:|
| Problémák / események / közlemények megtekintése | ✅ | ✅ | ✅ |
| Probléma és esemény létrehozása | ✅ | ✅ | ✅ |
| Saját probléma és esemény törlése | ✅ | ✅ | ✅ |
| Közlemény létrehozása / szerkesztése / törlése | ❌ | ✅ | ✅ |
| Probléma megjelölése megoldottként | ❌ | ✅ | ✅ |
| Chat üzenetek küldése és saját üzenet törlése | ✅ | ✅ | ✅ |
| Bármely chat üzenet törlése | ❌ | ❌ | ✅ |
| Bármely tartalom törlése | ❌ | ❌ | ✅ |
| Admin panel elérése | ❌ | ❌ | ✅ |
| Felhasználók szerepkörének módosítása / törlése | ❌ | ❌ | ✅ |

---

## Projektstruktúra

```
app/
  Http/Controllers/Api/   # REST API vezérlők
  Models/                 # Eloquent modellek (User, Issue, Event, Statement, ChatMessage)
  Policies/               # Jogosultsági policy-k
  Services/               # Szolgáltatások (pl. ReverseGeocodingService)
resources/
  css/styles/             # Komponens CSS fájlok (funkciónként szétválasztva)
  js/
    components/           # Újrafelhasználható React komponensek
    pages/                # Inertia oldalkomponensek (chat, admin, events, issues, statements)
    layouts/              # Oldal elrendezések
routes/
  web.php                 # Inertia oldalútvonalak
  api.php                 # JSON API útvonalak
database/
  migrations/             # Adatbázis séma
  seeders/                # Demo adatok
```
