<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Medico;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Requests\StoreMedicoRequest;
use App\Http\Requests\StoreMedicoRequest as RequestsStoreMedicoRequest;
use Illuminate\Http\Response;

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

    public function show($id)
    {
        $medico = Medico::find($id);

        if (!$medico) {
            return response()->json(['message' => 'Médico não encontrado'], 4005);
        }

        return response()->json($medico, 200);
    }

    public function update(Request $request, $id)
    {
        $medico = Medico::find($id);

        if (!$medico) {
            return response()->json(['message' => 'Médico não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $medico->update($request->all());
        return response()->json($medico, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $medico = Medico::find($id);

        if (!$medico) {
            return response()->json(['message' => 'Médico não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $medico->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
