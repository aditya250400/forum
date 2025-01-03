<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Gojo Satoru',
            'username' => 'gojo-satoru-1',
            'email' => 'gojo@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Muhamad Rizki Aditya',
            'username' => 'muhamad-rizki-aditya-2',
            'email' => 'muhamadrizkiaditya32@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
