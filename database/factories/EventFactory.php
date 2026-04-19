<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category' => fake()->randomElement(['kultura', 'kozossegi', 'oktatas', 'sport', 'csaladi', 'kreativ', 'vallasi', 'onkormanyzati', 'egyeb']),
            'title' => fake()->sentence(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'description' => fake()->paragraph(),
            'start_time' => fake()->dateTimeBetween('now', '+1 month'),
            'end_time' => fake()->dateTimeBetween('+1 month', '+2 months'),
            'user_id' => User::factory(),
        ];
    }
}
