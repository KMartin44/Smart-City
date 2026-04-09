<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStatementRequest;
use App\Http\Requests\UpdateStatementRequest;

class StatementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Statement::latest()->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStatementRequest $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $data['user_id'] = auth()->id();

        $statement = Statement::create($data);

        return response()->json($statement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Statement $statement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Statement $statement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStatementRequest $request, Statement $statement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Statement $statement)
    {
        $statement->delete();
        return response()->json([
            'message' => 'Statement törölve'
        ]);
    }
}
