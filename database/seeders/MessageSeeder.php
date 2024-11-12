<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Message::factory()
        ->count(1000)
        ->sequence(function (Sequence $sequence) {
            return [
                'content' => "Message " . $sequence->index,
                'created_at' => now()->subYear()->addHours($sequence->index),
                'user_id' => rand(2, 1),
            ];
        })
        ->create(
            [
                'room_id' => 1,
            ]
        );
    }
}