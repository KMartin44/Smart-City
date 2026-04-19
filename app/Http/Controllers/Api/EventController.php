<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return response()->json(Event::latest()->get(), 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Event::class);

        $event = Event::create($request->all());

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return response()->json(['data' => $event], 200);
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

