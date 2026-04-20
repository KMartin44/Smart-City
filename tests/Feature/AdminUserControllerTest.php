<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Issue;
use App\Models\Statement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminUserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_delete_another_user_and_related_records(): void
    {
        $admin = User::factory()->create(['type' => 'admin']);
        $user = User::factory()->create(['type' => 'lakos']);

        $issue = Issue::factory()->create(['user_id' => $user->id]);
        $event = Event::factory()->create(['user_id' => $user->id]);
        $statement = Statement::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($admin)->deleteJson("/api/admin/users/{$user->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseMissing('issues', ['id' => $issue->id]);
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
        $this->assertDatabaseMissing('statements', ['id' => $statement->id]);
    }

    public function test_admin_cannot_delete_own_account(): void
    {
        $admin = User::factory()->create(['type' => 'admin']);

        $response = $this->actingAs($admin)->deleteJson("/api/admin/users/{$admin->id}");

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'A saját fiókodat nem törölheted innen.',
            ]);

        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_non_admin_cannot_delete_users(): void
    {
        $user = User::factory()->create(['type' => 'lakos']);
        $otherUser = User::factory()->create(['type' => 'lakos']);

        $response = $this->actingAs($user)->deleteJson("/api/admin/users/{$otherUser->id}");

        $response->assertForbidden();
        $this->assertDatabaseHas('users', ['id' => $otherUser->id]);
    }
}
