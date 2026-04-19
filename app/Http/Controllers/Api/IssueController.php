<?php

namespace App\Http\Controllers\Api;

use App\Models\Issue;
use App\Services\ReverseGeocodingService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function __construct(private ReverseGeocodingService $reverseGeocoding)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $issues = Issue::latest()->get()->map(function (Issue $issue) {
            $address = $this->reverseGeocoding->resolve((float) $issue->latitude, (float) $issue->longitude);

            return [
                ...$issue->toArray(),
                'address' => $address,
            ];
        });

        return response()->json($issues, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Issue::class);

        $validated = $request->validate([
            'category' => 'required|in:kozterulet,kornyezet,koztisztasag,kozlekedes,zaj,kozmuvek,allat,intezmenyek,digitalis,egyeb',
            'title' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'description' => 'required|string',
        ]);

        $issue = Issue::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'is_done' => false,
        ]);

        return response()->json($issue, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Issue $issue)
    {
        $data = [
            ...$issue->toArray(),
            'address' => $this->reverseGeocoding->resolve((float) $issue->latitude, (float) $issue->longitude),
        ];

        return response()->json(['data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Issue $issue)
    {
        $this->authorize('update', $issue);

        $issue->update($request->only('is_done'));

        return response()->json(['data' => $issue], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Issue $issue)
    {
        $this->authorize('delete', $issue);

        $issue->delete();

        return response()->noContent();
    }
}

