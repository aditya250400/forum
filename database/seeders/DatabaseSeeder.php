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
        User::create([
            'name' => 'Muhamad Rizki Aditya',
            'username' => 'muhamad-rizki-aditya-1',
            'email' => 'muhamadrizkiaditya32@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
