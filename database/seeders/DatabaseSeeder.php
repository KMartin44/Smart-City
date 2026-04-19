<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\Issue;
use App\Models\Statement;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'type' => 'lakos',
            'first_name' => 'János',
            'last_name' => 'Kovács',
            'email' => 'lakos@example.com',
            'password' => 'password',
            'phone_number' => '+36 30 123 4567',
            'dob' => '1985-05-15',
            'address' => 'Budapest, Kossuth Lajos utca 1.',
        ]);

        User::create([
            'type' => 'onkormanyzat',
            'first_name' => 'Anna',
            'last_name' => 'Szabó',
            'email' => 'onkormanyzat@example.com',
            'password' => 'password',
            'phone_number' => '+36 1 234 5678',
            'dob' => '1975-03-20',
            'address' => 'Városháza, Fő tér 5.',
        ]);

        User::create([
            'type' => 'admin',
            'first_name' => 'Péter',
            'last_name' => 'Nagy',
            'email' => 'admin@example.com',
            'password' => 'password',
            'phone_number' => '+36 20 987 6543',
            'dob' => '1980-11-10',
            'address' => 'Admin épület, Admin utca 10.',
        ]);

        Event::insert([
            [
                'category' => 'kultura',
                'title' => 'Szabadtéri koncert a Margitszigeten',
                'latitude' => 47.5280,
                'longitude' => 19.0490,
                'description' => 'Nyári szabadtéri koncert több fellépővel.',
                'start_time' => '2026-06-10 18:00:00',
                'end_time' => '2026-06-10 22:00:00',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'sport',
                'title' => 'Futóverseny a Városligetben',
                'latitude' => 47.5149,
                'longitude' => 19.0856,
                'description' => '5km és 10km futóverseny.',
                'start_time' => '2026-05-12 09:00:00',
                'end_time' => '2026-05-12 12:00:00',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'kozossegi',
                'title' => 'Lakógyűlés a XI. kerületben',
                'latitude' => 47.4769,
                'longitude' => 19.0417,
                'description' => 'Közösségi megbeszélés helyi ügyekről.',
                'start_time' => '2026-05-20 17:00:00',
                'end_time' => '2026-05-20 19:00:00',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'oktatas',
                'title' => 'Ingyenes programozás workshop',
                'latitude' => 47.4979,
                'longitude' => 19.0402,
                'description' => 'Bevezetés a webfejlesztésbe.',
                'start_time' => '2026-06-01 10:00:00',
                'end_time' => '2026-06-01 14:00:00',
                'user_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'csaladi',
                'title' => 'Gyermeknap a parkban',
                'latitude' => 47.5316,
                'longitude' => 19.0660,
                'description' => 'Programok gyerekeknek és családoknak.',
                'start_time' => '2026-05-25 10:00:00',
                'end_time' => '2026-05-25 16:00:00',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'kreativ',
                'title' => 'Festő workshop kezdőknek',
                'latitude' => 47.4925,
                'longitude' => 19.0513,
                'description' => 'Alap festési technikák tanulása.',
                'start_time' => '2026-06-15 15:00:00',
                'end_time' => '2026-06-15 18:00:00',
                'user_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'vallasi',
                'title' => 'Templomi ünnepség',
                'latitude' => 47.5009,
                'longitude' => 19.0541,
                'description' => 'Ünnepi mise és közösségi program.',
                'start_time' => '2026-06-20 09:00:00',
                'end_time' => '2026-06-20 12:00:00',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'onkormanyzati',
                'title' => 'Önkormányzati fórum',
                'latitude' => 47.4970,
                'longitude' => 19.0400,
                'description' => 'Lakossági fórum városi fejlesztésekről.',
                'start_time' => '2026-05-30 18:00:00',
                'end_time' => '2026-05-30 20:00:00',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'egyeb',
                'title' => 'Bolhapiac a belvárosban',
                'latitude' => 47.4984,
                'longitude' => 19.0408,
                'description' => 'Használt tárgyak vására.',
                'start_time' => '2026-06-05 08:00:00',
                'end_time' => '2026-06-05 14:00:00',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category' => 'sport',
                'title' => 'Street workout verseny',
                'latitude' => 47.4700,
                'longitude' => 19.0700,
                'description' => 'Utcai edzés verseny amatőröknek.',
                'start_time' => '2026-06-18 16:00:00',
                'end_time' => '2026-06-18 20:00:00',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Issue::insert([
            ['category' => 'kozterulet', 'title' => 'Kátyú az úton', 'latitude' => 47.4979, 'longitude' => 19.0402, 'description' => 'Nagy kátyú az úttesten.', 'is_done' => false, 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'kornyezet', 'title' => 'Szemét a parkban', 'latitude' => 47.5149, 'longitude' => 19.0856, 'description' => 'Tele van szeméttel a park.', 'is_done' => false, 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'koztisztasag', 'title' => 'Túlcsordult kuka', 'latitude' => 47.5000, 'longitude' => 19.0600, 'description' => 'Nem ürítik rendszeresen.', 'is_done' => false, 'user_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'kozlekedes', 'title' => 'Rosszul működő lámpa', 'latitude' => 47.4900, 'longitude' => 19.0300, 'description' => 'Nem vált zöldre.', 'is_done' => false, 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'zaj', 'title' => 'Hangos építkezés', 'latitude' => 47.4800, 'longitude' => 19.0500, 'description' => 'Korán reggel kezdik.', 'is_done' => false, 'user_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'kozmuvek', 'title' => 'Vízszivárgás', 'latitude' => 47.4950, 'longitude' => 19.0450, 'description' => 'Csőtörés gyanú.', 'is_done' => false, 'user_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'allat', 'title' => 'Kóbor kutya', 'latitude' => 47.5050, 'longitude' => 19.0550, 'description' => 'Gazdátlan állat.', 'is_done' => true, 'user_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'intezmenyek', 'title' => 'Zárva az ügyfélszolgálat', 'latitude' => 47.4980, 'longitude' => 19.0420, 'description' => 'Munkaidőben is zárva.', 'is_done' => false, 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'digitalis', 'title' => 'Hibás weboldal', 'latitude' => 47.4990, 'longitude' => 19.0430, 'description' => 'Nem működik az oldal.', 'is_done' => true, 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['category' => 'egyeb', 'title' => 'Ismeretlen probléma', 'latitude' => 47.4960, 'longitude' => 19.0410, 'description' => 'Egyéb bejelentés.', 'is_done' => true, 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        Statement::insert([
            ['title' => 'Útfelújítás kezdődik', 'description' => 'Felújítás indul több utcában.', 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Új park nyílik', 'description' => 'Új zöldterület kerül átadásra.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Forgalomkorlátozás', 'description' => 'Ideiglenes lezárások várhatóak.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Iskolakezdési információk', 'description' => 'Fontos dátumok és tudnivalók.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Közlekedési változások', 'description' => 'Új buszmenetrend lép életbe.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Közbiztonsági felhívás', 'description' => 'Figyeljenek az értékeikre.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Egészségügyi kampány', 'description' => 'Ingyenes szűrések indulnak.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Energiatakarékosság', 'description' => 'Tippek a fogyasztás csökkentésére.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Rendezvény bejelentés', 'description' => 'Városi fesztivál közeleg.', 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Lakossági tájékoztató', 'description' => 'Fontos városi hírek.', 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
