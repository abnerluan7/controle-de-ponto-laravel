<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'master',
            'email' => 'master@master.com',
            'cpf' => '02202706371',
            'pis' => '6050708',
            'cargo' => 'Master',
            'equipe' => 'Sombras',
            'password' => '$2y$10$toegJM/LxYIzaXAC3Hkfr.spfNCeNUNL5yBxhev82e6Vg2H3GnUA.',
            'papel' => 1,
            'is_verified' => 'true'
        ]);
    }
}
