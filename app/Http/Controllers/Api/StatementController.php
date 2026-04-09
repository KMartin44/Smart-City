<?php

namespace App\Http\Controllers\Api;

use App\Models\Statement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Statement::latest()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $statement = Statement::create($request->all());

        return response()->json($statement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Statement $statement)
    {
        return response()->json(['data' => $statement], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Statement $statement)
    {
        $user = Auth::user();
        if (!$user || !in_array($user->type, ['admin', 'onkormanyzat', 'onkormanyzati'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $statement->update($request->all());
        return response()->json(['data' => $statement], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Statement $statement)
    {
        $user = Auth::user();
        if (!$user || ($user->type !== 'admin' && $user->id !== $statement->user_id)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $statement->delete();
        return response()->noContent();
    }
}
