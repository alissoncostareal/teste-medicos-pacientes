<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Medico;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Requests\StoreMedicoRequest;
use App\Http\Requests\StoreMedicoRequest as RequestsStoreMedicoRequest;

class MedicoController extends Controller
{
    public function index(): JsonResponse
    {
        $medicos = Medico::select('id', 'nome', 'CRM', 'UFCRM')->get();

        return response()->json($medicos, 200);
    }

    public function store(RequestsStoreMedicoRequest $request): JsonResponse
    {
        Medico::create($request->validated());
        return response()->json('Médico criado com sucesso', 201);
    }
}
