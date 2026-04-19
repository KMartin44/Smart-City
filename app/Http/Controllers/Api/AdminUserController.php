<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    private function ensureAdmin(Request $request): void
    {
        if (!$request->user() || $request->user()->type !== 'admin') {
            abort(403, 'Nincs jogosultságod ehhez a művelethez.');
        }
    }

    public function index(Request $request)
    {
        $this->ensureAdmin($request);

        $users = User::query()
            ->select(['id', 'first_name', 'last_name', 'email', 'type', 'created_at'])
            ->orderBy('id')
            ->get();

        return response()->json($users);
    }

    public function updateRole(Request $request, User $user)
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'type' => 'required|in:lakos,onkormanyzat,admin',
        ]);

        if ($request->user()->id === $user->id && $validated['type'] !== 'admin') {
            return response()->json([
                'message' => 'A saját admin szerepkörödet nem veheted el.',
            ], 422);
        }

        $user->type = $validated['type'];
        $user->save();

        return response()->json($user->only(['id', 'first_name', 'last_name', 'email', 'type', 'created_at']));
    }

    public function destroy(Request $request, User $user)
    {
        $this->ensureAdmin($request);

        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' => 'A saját fiókodat nem törölheted innen.',
            ], 422);
        }

        $user->delete();

        return response()->noContent();
    }
}
