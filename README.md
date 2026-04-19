# SmartCity

Egy közösségi platform városlakók és önkormányzat számára, iskolai projektként készítve. A polgárok problémákat jelenthetnek be, böngészhetnek városi eseményeket, és olvashatják a hivatalos közleményeket — egy helyen.

---

## Funkciók

- **Problémák** — A polgárok helyi problémákat jelenthetnek be (infrastruktúra, környezet, zaj stb.). Az önkormányzati felhasználók megjelölhetik őket megoldottként.
- **Események** — Közösségi események böngészése és létrehozása, térképes helyszínválasztással.
- **Közlemények** — Hivatalos bejelentések, amelyeket az önkormányzat publikál.
- **Térkép** — Interaktív térképnézet a városról.
- **Admin panel** — Minden tartalom kezelése (események, problémák, közlemények) részletes és szerkesztő nézetekkel.
- **Szerepköralapú hozzáférés** — Három felhasználói szerepkör különböző jogosultságokkal: `lakos`, `onkormanyzati`, `admin`.

---

## Technológiai stack

| Réteg | Technológia |
|---|---|
| Backend | Laravel 12 (PHP 8.2+) |
| Frontend | React + TypeScript (Inertia.js) |
| Stílus | Tailwind CSS v4 + egyedi komponens CSS |
| Build eszköz | Vite |
| Hitelesítés | Laravel Sanctum |
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

| Művelet | Lakos | Önkormányzati | Admin |
|---|:---:|:---:|:---:|
| Problémák / események / közlemények megtekintése | ✅ | ✅ | ✅ |
| Probléma és esemény létrehozása | ✅ | ✅ | ✅ |
| Saját probléma és esemény törlése | ✅ | ✅ | ✅ |
| Közlemény létrehozása / szerkesztése / törlése | ❌ | ✅ | ✅ |
| Probléma megjelölése megoldottként | ❌ | ✅ | ✅ |
| Bármely tartalom törlése | ❌ | ❌ | ✅ |
| Admin panel elérése | ❌ | ❌ | ✅ |

---

## Projektstruktúra

```
app/
  Http/Controllers/Api/   # REST API vezérlők
  Models/                 # Eloquent modellek (User, Issue, Event, Statement)
  Policies/               # Jogosultsági policy-k
resources/
  css/styles/             # Komponens CSS fájlok (funkciónként szétválasztva)
  js/
    components/           # Újrafelhasználható React komponensek
    pages/                # Inertia oldalkomponensek
    layouts/              # Oldal elrendezések
routes/
  web.php                 # Inertia oldalútvonalak
  api.php                 # JSON API útvonalak
database/
  migrations/             # Adatbázis séma
  seeders/                # Demo adatok
```
