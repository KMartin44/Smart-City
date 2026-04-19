<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Services\ReverseGeocodingService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function __construct(private ReverseGeocodingService $reverseGeocoding)
    {
    }

    public function index()
    {
        $events = Event::latest()->get()->map(function (Event $event) {
            $address = $this->reverseGeocoding->resolve((float) $event->latitude, (float) $event->longitude);

            return [
                ...$event->toArray(),
                'address' => $address,
            ];
        });

        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Event::class);

        $validated = $request->validate([
            'category' => 'required|in:kultura,kozossegi,oktatas,sport,csaladi,kreativ,vallasi,onkormanyzati,egyeb',
            'title' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $event = Event::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        $data = [
            ...$event->toArray(),
            'address' => $this->reverseGeocoding->resolve((float) $event->latitude, (float) $event->longitude),
        ];

        return response()->json(['data' => $data], 200);
    }

    public function update(Request $request, Event $event)
    {
        $this->authorize('update', $event);

        $event->update($request->all());

        return response()->json(['data' => $event], 200);
    }

    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $event->delete();

        return response()->noContent();
    }
}

