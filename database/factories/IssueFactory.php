<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Issue>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category' => fake()->randomElement(['kozterulet', 'kornyezet', 'koztisztasag', 'kozlekedes', 'zaj', 'kozmuvek', 'allat', 'intezmenyek', 'digitalis', 'egyeb']),
            'title' => fake()->sentence(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'description' => fake()->paragraph(),
            'user_id' => User::factory(),
        ];
    }
}
