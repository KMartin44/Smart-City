<?php

namespace App\Http\Controllers\Api;

use App\Models\Statement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatementController extends Controller
{
    public function index()
    {
        return response()->json(Statement::latest()->get(), 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Statement::class);

        $statement = Statement::create($request->all());

        return response()->json($statement, 201);
    }

    public function show(Statement $statement)
    {
        return response()->json(['data' => $statement], 200);
    }

    public function update(Request $request, Statement $statement)
    {
        $this->authorize('update', $statement);

        $statement->update($request->all());

        return response()->json(['data' => $statement], 200);
    }

    public function destroy(Statement $statement)
    {
        $this->authorize('delete', $statement);

        $statement->delete();

        return response()->noContent();
    }
}

