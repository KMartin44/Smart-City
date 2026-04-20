<?php

namespace Tests\Feature;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IssueControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_issue_and_user_id_comes_from_session(): void
    {
        $user = User::factory()->create(['type' => 'lakos']);
        $otherUser = User::factory()->create(['type' => 'admin']);

        $response = $this->actingAs($user)->postJson('/api/issues', [
            'category' => 'kozterulet',
            'title' => 'Teszthiba',
            'latitude' => 47.4979,
            'longitude' => 19.0402,
            'description' => 'Leiras a teszthibahoz.',
            'user_id' => $otherUser->id,
        ]);

        $response->assertCreated()
            ->assertJsonFragment([
                'title' => 'Teszthiba',
                'user_id' => $user->id,
                'is_done' => false,
            ]);

        $this->assertDatabaseHas('issues', [
            'title' => 'Teszthiba',
            'user_id' => $user->id,
        ]);
    }

    public function test_issue_creation_requires_coordinates_and_category(): void
    {
        $user = User::factory()->create(['type' => 'lakos']);

        $response = $this->actingAs($user)->postJson('/api/issues', [
            'title' => 'Hibas issue',
            'description' => 'Hianyzo mezokkel.',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['category', 'latitude', 'longitude']);

        $this->assertDatabaseCount('issues', 0);
    }

    public function test_onkormanyzat_user_can_mark_issue_as_done(): void
    {
        $user = User::factory()->create(['type' => 'onkormanyzat']);
        $issue = Issue::factory()->create(['is_done' => false]);

        $response = $this->actingAs($user)->putJson("/api/issues/{$issue->id}", [
            'is_done' => true,
        ]);

        $response->assertOk()
            ->assertJsonPath('data.is_done', true);

        $this->assertDatabaseHas('issues', [
            'id' => $issue->id,
            'is_done' => true,
        ]);
    }

    public function test_lakos_user_cannot_mark_other_issue_as_done(): void
    {
        $user = User::factory()->create(['type' => 'lakos']);
        $issue = Issue::factory()->create(['is_done' => false]);

        $response = $this->actingAs($user)->putJson("/api/issues/{$issue->id}", [
            'is_done' => true,
        ]);

        $response->assertForbidden();
        $this->assertDatabaseHas('issues', [
            'id' => $issue->id,
            'is_done' => false,
        ]);
    }
}
