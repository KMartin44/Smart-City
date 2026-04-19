<?php

namespace App\Http\Controllers\Api;

use App\Models\ChatMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $messages = ChatMessage::with('user:id,first_name,last_name')
            ->latest()
            ->take(100)
            ->get()
            ->reverse()
            ->values();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = ChatMessage::create([
            'user_id' => $request->user()->id,
            'message' => $request->message,
        ]);

        $message->load('user:id,first_name,last_name');

        return response()->json($message, 201);
    }

    public function destroy(Request $request, ChatMessage $chatMessage)
    {
        if ($request->user()->type !== 'admin' && $request->user()->id !== $chatMessage->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $chatMessage->delete();

        return response()->noContent();
    }
}
