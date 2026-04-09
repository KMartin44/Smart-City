<?php

namespace App\Http\Controllers\Api;

use App\Models\Issue;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Issue::latest()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $issue = Issue::create($request->all());

        return response()->json($issue, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Issue $issue)
    {
        return response()->json(['data' => $issue], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Issue $issue)
    {
        $issue->update($request->all());
        return response()->json(['data' => $issue], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Issue $issue)
    {
        $user = auth()->user();
        if (!$user || ($user->type !== 'admin' && $user->id !== $issue->user_id)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $issue->delete();
        return response()->noContent();
    }
}
