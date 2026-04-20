<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatementControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_onkormanyzat_user_can_create_statement(): void
    {
        $user = User::factory()->create(['type' => 'onkormanyzat']);

        $response = $this->actingAs($user)->postJson('/api/statements', [
            'title' => 'Uj kozlemeny',
            'description' => 'Ez egy teszt kozlemeny.',
            'user_id' => $user->id,
        ]);

        $response->assertCreated()
            ->assertJsonFragment([
                'title' => 'Uj kozlemeny',
                'description' => 'Ez egy teszt kozlemeny.',
            ]);

        $this->assertDatabaseHas('statements', [
            'title' => 'Uj kozlemeny',
            'user_id' => $user->id,
        ]);
    }

    public function test_lakos_user_cannot_create_statement(): void
    {
        $user = User::factory()->create(['type' => 'lakos']);

        $response = $this->actingAs($user)->postJson('/api/statements', [
            'title' => 'Tiltott kozlemeny',
            'description' => 'Ezt nem hozhatja letre lakos.',
            'user_id' => $user->id,
        ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('statements', [
            'title' => 'Tiltott kozlemeny',
        ]);
    }
}
