<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            EventSeeder::class,
            IssueSeeder::class,
            StatementSeeder::class,
        ]);

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
    }
}
